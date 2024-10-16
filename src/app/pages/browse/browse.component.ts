import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieCategoryComponent } from "../../components/movie-category/movie-category.component";
import { Movie } from '../../types/movies';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MovieCardComponent, MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'] // Fixed typo in styleUrl
})
export class BrowseComponent {
closeModal() {
throw new Error('Method not implemented.');
}
  private router = inject(Router)
  movieService = inject(MovieService);
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  bannerMovie!: Movie;
  movie!: Movie;
  tmdbConfig: any;
  selectedMovie: any;
  public domSanitizer = inject(DomSanitizer);
  videoUrl: string | null = null;
  movieList: any;

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((result: any) => {
      console.log(result);
      this.popularMovies = result.results;
      this.bannerMovie = this.popularMovies[0];
      this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
        this.bannerMovie.videoKey = res.results.find((x: any) => x.site === 'YouTube').key;
        console.log(this.bannerMovie);
      });
    });

    this.movieService.getTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovies = result.results;
    });

    this.movieService.getNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovies = result.results;
    });

    this.movieService.getUpcomingMovies().subscribe((result: any) => {
      this.upcomingMovies = result.results;
    });
  }

  onMovieSelected(movie: Movie) {
    // Navigate to the movie trailer page with the movie id as a parameter
    this.router.navigate(['/movie', movie.id]);
  }

  playVideo() {
    if (this.videoUrl) {
      // Logic to play the video
      console.log(`Playing video: ${this.videoUrl}`);
    }
  }

  trackByMovie(index: number, movie: Movie) {
    return movie.id;
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.onMovieSelected(movie);
  }
}
