
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Url } from 'url';


interface ShopData {

  name: string;
  quantity: string;
  picture: any;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  shopList = [];
  shopData: ShopData;
  OurItemForm: FormGroup;

  selectedFile: File = null;
  upLoadedFile: any;

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

  addPic(event) {
    const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = (p) => {
        console.log(p);
      };
      reader.onloadend = (e) => {
        console.log(e.target);
        this.upLoadedFile = reader.result;
        this.OurItemForm.get('picture').setValue(this.upLoadedFile);
        //console.log(this.upLoadedFile);
      };
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

  // addPic($event: any) {
  //   let reader = new FileReader();
  //   reader.onload = ($event: any) => {
  //     this.shopData.picture = $event.target.result;
  //   }
  //   reader.readAsDataURL($event.target.files[0]);
  // }


}
