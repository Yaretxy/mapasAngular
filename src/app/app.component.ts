import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';

import { TaqueriasService } from './taquerias.service';
import { Taquerias } from './taquerias';
//import { connect } from 'http2';
import { Observable } from 'rxjs';
//import { disconnect } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapas_ejemplo';
  zoom = 12
  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  markers:any[]= [];
  taqueria!:Taquerias[]; 
constructor(private taqueriasService:TaqueriasService){}

getTaquerias():void{
  this.taqueriasService.getTaquerias().subscribe(taquerias=>this.taqueria=taquerias)

}


  ngOnInit(): void {
    this.center={
      lat:32.638111,
      lng:-115.475548,
    }



    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.addMarker();
    this.getTaquerias();
  }

  click(event:google.maps.MapMouseEvent){
    console.log(event)
  }
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--
  }

  addMarker() {
    this.markers.push({
    position: {
    lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
    lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    },
    label: {
    color: 'red',
    text: 'Marker label ' + (this.markers.length + 1),
    },
   
    title: 'Marker title ' + (this.markers.length + 1),
   
    options: { animation: google.maps.Animation.BOUNCE },
   
    })
   
    } 
}
/*
export class  TaqueriasDataSource extends DataSource<any>{
  displayedColumns:string []=['nombre','calidad','precio'];
  dataSource=taquerias;
  connect():Observable<Taquerias[]>{
    return this.taqueriasService.getTaquerias();
  };
  disconnect(){}
}
*/
