import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { createWriteStream } from 'fs';

interface ShopData{
  
  name : string;
  quantity : string;
  picture : string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

shopList = [];
shopData : ShopData;
OurItemForm : FormGroup;

  constructor( private firebaseService: FirebaseService,
    public fb: FormBuilder) {
      this.shopData = {} as ShopData
    }
     ngOnInit() {
       this.OurItemForm = this.fb.group({
        name : ['',[Validators.required]],
        quantity : ['',[Validators.required]],
        picture : ['',[Validators.required]]
       })

       this.firebaseService.read_Items().subscribe(data =>{
                this.shopList = data.map(e =>{
                  return {
                  id: e.payload.doc.id,
                  isEdit: false,
                  name: e.payload.doc.data()['name'],
                  quantity: e.payload.doc.data()['quantity'],
                  picture: e.payload.doc.data()['picture'],
                  };
                } )
                console.log(this.shopList)
      });
    
}
CreateItem() {
  this.firebaseService.create_Items(this.OurItemForm.value)
    .then(resp => {
      //Reset form
      this.OurItemForm.reset();
    })
    .catch(error => {
      console.log(error);
    });
}

RemoveItem(itemID) {
  this.firebaseService.delete_Items(itemID)

}

EditItem(item) {
  item.isEdit = true;
  item.Editname = item.name;
  item.Editquantity = item.quantity;
  item.Editpicture = item.picture;

}

UpdateItem(itemRow) {
  let item = {};
  item['name'] = itemRow.Editname;
  item['quantity'] = itemRow.Editquantity;
  item['picture'] = itemRow.Editpicture;
  this.firebaseService.update_Items(itemRow.id, item)
  itemRow.isEdit = false;
}

}
