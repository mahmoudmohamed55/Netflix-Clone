import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie! :Movie;
  tmdbConfig=tmdbConfig;
  @Output() movieSelected = new EventEmitter<any>();

  onClick() {
    this.movieSelected.emit(this.movie); // Emit the clicked movie
  }
}
