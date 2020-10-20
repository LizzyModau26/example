import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'Itemss';
  constructor(private firestore: AngularFirestore) { }

create_Items(items){
  return this.firestore.collection(this.collectionName).add(items)
}


read_Items(){
  return this.firestore.collection(this.collectionName).snapshotChanges()
}

update_Items(itemsID, items){
   this.firestore.doc( this.collectionName + '/' + itemsID).update(items)
}

delete_Items(items_id){
   this.firestore.doc(this.collectionName + '/' + items_id).delete();
}

}
