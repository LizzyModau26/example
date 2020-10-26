import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//import { Url } from 'url';


interface ShopData {

  name: string;
  quantity: string;
  picture: File;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  shopList = [];
  shopData: ShopData;
  OurItemForm: FormGroup;

  constructor(private firebaseService: FirebaseService,
    public fb: FormBuilder) {
    this.shopData = {} as ShopData
  }
  ngOnInit() {
    this.OurItemForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      picture: ['', [Validators.required]]
    })

    this.firebaseService.read_Items().subscribe(data => {
      this.shopList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          quantity: e.payload.doc.data()['quantity'],
          picture: e.payload.doc.data()['picture'],
        };
      })
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

  RemoveItem(itemsID) {
    this.firebaseService.delete_Items(itemsID)

  }

  EditItem(items) {
    items.isEdit = true;
    items.Editname = items.name;
    items.Editquantity = items.quantity;
    items.Editpicture = items.picture;

  }

  UpdateItem(itemsRow) {
    let items = {};
    items['name'] = itemsRow.Editname;
    items['quantity'] = itemsRow.Editquantity;
    items['picture'] = itemsRow.Editpicture;

    this.firebaseService.update_Items(itemsRow.id, items)
    itemsRow.isEdit = false;
  }

  // upPic(event: any) {
  //   let reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.shopData.picture = event.target.result;

  //   }
  //   reader.readAsDataURL(event.target.files[0]);
  //   this.firebaseService.update_Items(this.shopData);
  // }

}
