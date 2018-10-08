import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Player {
    id: Number,
    name: String,
    answers: Number,
    points: Number,
    isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private accessToken;
    private headers;

    constructor(private oktaAuth: OktaAuthService, private http: Http) {
        this.init();
    }

    async init() {
        this.accessToken = await this.oktaAuth.getAccessToken();
        this.headers = new Headers({
            Authorization: 'Bearer ' + this.accessToken
        });
    }

    getPlayers(): Observable<Player[]> {
        return this.http.get(API_URL + '/api/players',
            new RequestOptions({ headers: this.headers })
        )
        .map(res => {
            let modifiedResult = res.json().data
            modifiedResult = modifiedResult.map(function(player) {
                player.isUpdating = false;
                return player;
            });
            return modifiedResult;
        });
    }
}
