import { Component, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "presets-image-overlay",
  templateUrl: "./image-overlay.component.html",
  styleUrls: ["./image-overlay.component.scss"]
})
export class ImageOverlayComponent implements OnInit, OnChanges {
  @Input() src: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.visible = this.src !== null;
  }

  public open() {this.visible = true;}
  public close() {this.visible = false;}

  @HostBinding("class.visible") visible = false;

  @HostListener("click") onClick() {
    this.visible = false;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydown($event: KeyboardEvent) {
    console.log($event.key);
    if ($event.key === 'Escape') {
      this.visible = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src) {
      this.visible = changes.src.currentValue !== null;
    }
  }
}
