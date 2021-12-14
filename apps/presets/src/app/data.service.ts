import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface FFXIVPluginResponse {
  plugins: FFXIVPlugin[];
}

export interface FFXIVPlugin {
  name: string;
  website?: string;
  presets: FFXIVPluginPreset[];
}

export interface FFXIVPluginPreset {
  name: string;
  description?: string;
  code: string;
  screenshots: string[];
  created: Date;
  author?: string;
  originalMessage?: string;
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  static readonly PLUGIN_PRESETS_URL = "/assets/presets.json";

  plugins$ = new BehaviorSubject<FFXIVPluginResponse>({ plugins: [] });

  constructor(private client: HttpClient) {
    this.getPlugins().then();
  }

  async getPlugins(): Promise<FFXIVPluginResponse> {
    const response = await lastValueFrom(this.client.get<FFXIVPluginResponse>(DataService.PLUGIN_PRESETS_URL));
    this.plugins$.next(response);
    return response;
  }
}


