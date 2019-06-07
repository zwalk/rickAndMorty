import { Component, OnInit, HostListener } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character;
  isLoading = false;
  isLoadingMore = false;
  allCharacters: Character[] = [];
  isRendered = false;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {}

  getCharacter(): void {
    this.character = null;
    this.isLoading = true;

    this.characterService.getRandomCharacter()
      .subscribe(character => {
        this.character = character;
        this.isLoading = false;
      });
  }

  getAllCharacters(): void {
    this.isLoadingMore = true;
    this.characterService.getAllCharacters()
      .subscribe(result => {
        this.allCharacters = result.results;
        this.isLoadingMore = false;
      });

  }

  getNextPage(): void {
    this.isLoadingMore = true;

    if (this.characterService.getNextPageOfAllCharacters()) {
      this.characterService.getNextPageOfAllCharacters()
      .subscribe(result => {
        result.results.forEach(character => {
            this.allCharacters.push(character);
            this.isLoadingMore = false;
        });
      });
    } else {
      this.isLoadingMore = false;
    }

  }


  @HostListener('window:scroll') getNextPageOnScrollToBottom(): void {


    if (window.pageYOffset + window.innerHeight >= document.body.clientHeight && !this.isLoadingMore) {
      this.getNextPage();
      console.log('fired');
    }

    }

    hideAllCharacters(): void {
      this.allCharacters = [];
    }


}
