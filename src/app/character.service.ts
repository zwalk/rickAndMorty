import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Character } from './character';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) { }

  private characterAPIUrl = 'https://rickandmortyapi.com/api/character/';
  private allCharactersNextPageUrl: string;


  public getRandomCharacter(): Observable<any> {
    return this.http.get<Character>(this.characterAPIUrl + this.getRandomNumberBetween1And493());
  }

  private getRandomNumberBetween1And493(): number {
    // replace 493 with function call when I get it working
    return Math.floor((Math.random() * 493) + 1);
  }

  // planning to have it grab total amount of characters in case they keep adding more to the API
  // private getCharacterCount(): number {

  //   let characterCount: number;
  //   debugger
  //   const firstPageOfChars = this.http.get<any>(this.characterAPIUrl);

  //   firstPageOfChars.subscribe(result => characterCount = result.info.count as number);

  //   return characterCount;
  // }

  public getAllCharacters(): Observable<any> {
    const allChars = this.http.get<any>(this.characterAPIUrl);

    allChars.subscribe(result => this.allCharactersNextPageUrl = result.info.next);

    return allChars;
  }

  public getNextPageOfAllCharacters(): Observable<any> {
   let nextPage: Observable<any>;

    if (this.allCharactersNextPageUrl !== '') {
      nextPage = this.http.get<any>(this.allCharactersNextPageUrl);

      nextPage.subscribe(result => this.allCharactersNextPageUrl = result.info.next);
    }


    return nextPage;
  }


}
