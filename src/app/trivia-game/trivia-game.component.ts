import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: Player[];
  errorMessage: string;
  isLoading: boolean = true;

  constructor(private playerService: PlayerService) { }

    ngOnInit() {
        this.getPlayers();
    }

    getPlayers() {
        this.playerService
            .getPlayers()
            .subscribe(
                players => {
                    this.players = players;
                    this.isLoading = false;
                }
                error => this.errorMessage = <any>error
            );
    }

    findPlayer(id): Player {
        return this.players.find(player => player.id === id);
    }

    isUpdating(id): boolean {
        return this.findPlayer(id).isUpdating;
    }
}