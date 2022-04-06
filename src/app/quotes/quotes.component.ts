/**
 * @author Collin Blosser
 * @author Arthur Lattin
 */
import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { ListComponent } from '../list/list.component'
import { QuoteService } from '../services/quoteservice/quote-service.service'
import { MaterialsService } from '../services/Materials/materials.service';



interface SelectMaterial {
  value: string;
  viewValue: String;
}

interface MaterialGroup {
  name: string;
  materials: SelectMaterial[];
}
//material model/interface
interface Material {
  material_id: number;
  material_name: string;
  material_price: number;
  material_set_date: string;
}

@Component({
  selector: 'app-quote',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuoteComponent implements OnInit, AfterViewInit {
  
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
  comment = new FormControl('')

  
  SelectMaterial: MaterialGroup[] = []

  materials: Material[] = []

  constructor(private matService: MaterialsService, private up: ChangeDetectorRef, private serivce: QuoteService) {}
  

  // watching for changes in html after selection
  ngAfterViewInit(): void {
    this.items.changes.subscribe(value=> {
      this.calc(value);
      this.up.detectChanges();
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

  ngOnInit(): void {
   this.MaterialGroup.valueChanges.subscribe((value)=>{
     console.log(value);
     this.viewable_material = this.materials.find((item)=>item.material_id==value);
   });
   
    // http request 
   const request = this.matService.getMaterials();
   request.then((value)=>{this.materials = (value as any) // get around Material interface issue
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
          })
        }
   });
  }
  saveList(){
   this.AddedMaterial.push (this.materials.find((material)=>material.material_id === this.MaterialGroup.value))
  }
  submit(){
    let material_list = "";
    this.items.forEach((item)=>{
    material_list += `${item.itemData.material_id}:${item.formControl.value};`
    });
    this.serivce.save({
  quote_measurement: 0,
  quote_price: this.price,
  user_comments: this.comment.value,
  quote_material: material_list
})
  }
}