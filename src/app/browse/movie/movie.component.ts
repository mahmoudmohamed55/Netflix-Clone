import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // To get the movie ID from the route
import { MovieService } from '../../services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-movie',
  standalone:true,
  imports:[CommonModule, HeaderComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movieId!: number;
  videoUrl: any = null;
  movieService = inject(MovieService);
  domSanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);
  bannerMovie: any;
  popularMovies: any;




  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((result: any) => {
      if (result && result.results && result.results.length > 0) {
        this.popularMovies = result.results;
        this.bannerMovie = this.popularMovies[0]; // Assigning first movie as banner

        // Log the movie ID for debugging
        console.log('Banner Movie:', this.bannerMovie);

        // Fetch the video for the banner movie
        this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
          console.log('Video Response:', res); // Log the response to check video data

          const video = res.results.find((x: any) => x.site === 'YouTube' && x.type === 'Trailer');
          if (video) {
            this.bannerMovie.videoKey = video.key; // Correctly assign video key
            console.log('Video Key:', this.bannerMovie.videoKey); // Log the video key for debugging
          } else {
            console.error('No trailer found for the movie!');
          }
        });
      }
    });
  }

}
