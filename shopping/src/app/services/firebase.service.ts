import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'Items';
  constructor(private firestore: AngularFirestore) { }

create_Items(item){
  return this.firestore.collection(this.collectionName).add(item)
}


read_Items(){
  return this.firestore.collection(this.collectionName).snapshotChanges()
}

update_Items(itemID, item){
   this.firestore.doc( this.collectionName + '/' + itemID).update(item)
}

delete_Items(item_id){
   this.firestore.doc(this.collectionName + '/' + item_id).delete();
}

}
