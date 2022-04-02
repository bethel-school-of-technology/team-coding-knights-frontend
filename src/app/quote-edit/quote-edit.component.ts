/**
 * @author Collin Blosser
 * @author Arthur Lattin
 */
import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import { QuoteService } from '../services/quoteservice/quote-service.service';
import { ActivatedRoute, Router, type ParamMap } from '@angular/router';
import { MaterialsService, type Material } from '../services/Materials/materials.service';
import { UserAccountService } from '../services/UserAccount/user-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SelectMaterial {
  value: string;
  viewValue: String;
}

interface MaterialGroup {
  name: string;
  materials: SelectMaterial[];
}

@Component({
  selector: 'app-quote-edit',
  templateUrl: './quote-edit.component.html',
  styleUrls: ['./quote-edit.component.scss']
})
export class QuoteEditComponent implements OnInit, AfterViewInit {
  private quote_id: number | undefined;
  public price: number= 0;
  @ViewChildren("MateiralItem") 
  private items!: QueryList<ListComponent>;

  //showing the currency on html
  public formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  //declared variables/arrays
  AddedMaterial = [];
  viewable_material: Material | undefined;
  materialControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  MaterialGroup = new FormControl('', Validators.required);
  comment = new FormControl('');
  SelectMaterial: MaterialGroup[] = [];
  materials: Material[] = [];
  constructor(
    private up: ChangeDetectorRef, 
    private serivce: QuoteService, 
    private active_router: ActivatedRoute, 
    private matService: MaterialsService,
    private router: Router,
    private user: UserAccountService,
    private _snackBar: MatSnackBar
  ) {}
  

  // watching for changes in html after selection
  ngAfterViewInit(): void {
    this.items.changes.subscribe(value=> {
      this.calc(value);
      this.up.detectChanges();
    });
    // load quote into the form
    this.loadQuote();
  }
  ngOnInit(): void {
    // moved all logic to its own func
    this.getMaterials();
  }

  private async loadQuote() {

    try {
      // get quote from url
      const params = await new Promise<ParamMap>((ok,_)=>{
        const sub = this.active_router.paramMap.subscribe((value)=>{
          ok(value);
        });
        sub.unsubscribe();
      });
  
      this.quote_id = Number(params.get("id"));
  
      // fetch quote
      const quote = await this.serivce.getQuoteById(Number(this.quote_id));
      // update comment field
      this.comment.setValue(quote.user_comments);

      // parse material string
      let values: number[] = [];
      const items = quote.quote_material.split(";").filter(value=>value.length !== 0);
      for(let i = 0; i < items.length; i++) {
        const mat = items[i].split(":");
        const material = this.materials.find(value=>value.material_id === Number(mat[0]));
        this.AddedMaterial.push(material);
        values.push(Number(mat[1]));
      }

      // wait for list to update
      await new Promise<void>((ok,_)=>{
        setTimeout(()=>{ ok() },100)
      });

      // set the amounts
      for(const item of this.items){
        item.formControl.setValue(values[item.index]);
      }
      
    } catch (error) {
      console.error(error); 
    }
  }

  private getMaterials(){
    this.MaterialGroup.valueChanges.subscribe((value)=>{
      console.log(value);
      this.viewable_material = this.materials.find((item)=>item.material_id==value);
    });

    const request = this.matService.getMaterials();
    request.then((value)=>{
        this.materials = value;
        let select_materials: Map<string,any[]> = new Map();
        // list materials to dropdown
        const addToGroup = (material: Material, name: string, groupName: string) => {
            //converting to lowercase    
            if(!material.material_name.toLocaleLowerCase().includes(name)) return;

            //assigning group names in dropdown menu
            if(!select_materials.has(groupName)){
              select_materials.set(groupName, []);
            }
            let data = select_materials.get(groupName);
            data.push({ value: material.material_id, viewValue: material.material_name });
     
        }
        //all items assigned to groups 
        for(const material of value){
          addToGroup(material, "hardwood", "flooring");
          addToGroup(material, "tile", "flooring" );
          addToGroup(material, "carpet", "flooring");
          addToGroup(material, "linoleum", "flooring");
          addToGroup(material, "red", "paint");
          addToGroup(material, "white", "paint");
          addToGroup(material, "grey", "paint");
          addToGroup(material, "purple", "paint");
          addToGroup(material, "soundproof drywall", "drywall");
          addToGroup(material, "voc-absorbing drywall","drywall");
          addToGroup(material, "mold-resistant drywall", "drywall");
        }

        for(const [name,data] of select_materials.entries()){
            this.SelectMaterial.push({
              name: name,
              materials: data
            });
        }
    });
  }
   // set default value 
  private calc(list: QueryList<ListComponent>){
    this.price = 0;
    for(const a of list){
      this.price += a.calc();
    }
  }
  // recalculate after item is removed
  public removeItem = (index: number) => {
    this.AddedMaterial = this.AddedMaterial.filter((_,i)=>i!==index);
    this.reCalc();
  }
  // calculations on items selected
  public reCalc = () => {
    this.calc(this.items);
  }
  public saveList(){
    this.AddedMaterial.push(this.materials.find((material)=>material.material_id === this.MaterialGroup.value))
   }
  public async submit(){
     let material_list = "";
     this.items.forEach((item)=>{
         material_list += `${item.itemData.material_id}:${item.formControl.value};`
     });
     const res = await this.serivce.updateQuoteById(this.quote_id,{
       quote_price: this.price,
       user_comments: this.comment.value,
       quote_material: material_list
     });
     if(res) {
        this._snackBar.open("Saved changes","Ok",{ panelClass: "snack-bg-dark", duration: 3000, horizontalPosition: "right" });
     } else {
        this._snackBar.open("Failed to saved changes","Ok",{ panelClass: "snack-bg-dark", duration: 3000, horizontalPosition: "right" });
     }
  }

  public async deleteQuote(){
    const res = await this.serivce.deleteQuoteById(this.quote_id);
    if(res){
        this.router.navigateByUrl(`/account/${this.user.getUser().user_id}`);
    } else {
        this._snackBar.open("Failed to delete","Ok",{ panelClass: "snack-bg-dark", duration: 3000, horizontalPosition: "right" });
    }
  }
}