import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-square',
  template: `
    <div
      class="game-square rounded-lg border bg-teal-lightest 
      shadow-md "
      (click)="changePlayer()"
      [ngClass]="{ noClick: gameService.winner }"
    >
      <p class="text-grey-darker">{{ square.state }}</p>
    </div>
  `,
  styles: [
    `
      .game-square {
        height: 96%;
        text-align: center;
        line-height: 0.85;
        cursor: pointer;
      }

      .rounded-lg {
        border-radius: 0.5rem;
      }
      .border {
        border: 1px solid #e2e8f0;
      }
      .bg-teal-lightest {
        background-color: #e6fffa;
      }
      .shadow-md {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }

      p {
        display: inline;
        margin: 0px;
        font-size: 14rem;
        overflow: hidden;
      }

      .noClick {
        pointer-events: none;
      }
    `,
  ],
})
export class SquareComponent implements OnInit {
  @Input() square: { id: number; state: null | string };
  constructor(public gameService: GameService) {
    this.square = { id: 0, state: 'X' };
  }

  ngOnInit(): void {}

  changePlayer() {
    this.gameService.isGameRunning = true;

    if (this.gameService.isGameRunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(this.square);
    }
  }
}
