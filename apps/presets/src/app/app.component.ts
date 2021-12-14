import { Component, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ImageOverlayComponent } from "./image-overlay/image-overlay.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'presets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FFXIV Plugin Presets';
  overlayImageSrc: string | null = null;

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }

  @ViewChild(ImageOverlayComponent) imageOverlay!: ImageOverlayComponent;

  selectImage($event: string): void {
    console.log($event);
    this.overlayImageSrc = $event;
    this.imageOverlay.open();
  }
}
