import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  //selector: 'app-course-list', // Não será mais utilizado o selector pois será referenciado via link de rotas
  //template: '<h2>Course List</h2>'
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  _courses: Course[] = [];
  filteredCourses: Course[] = [];
  _filterBy: string; //  o underline(_) é pra indicar que será utilizado apenas neste componente

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void {
    this.courseService.retrieveAll().subscribe({
      next: (courses) => {
        this._courses = courses;
        this.filteredCourses = this._courses;
      },
      error: (err) => console.log('Error', err),
    });
  }

deleteById(courseId: number): void {
  this.courseService.deleteById(courseId).subscribe({
    next: () => {
      console.log('Deleted with success');
      this.retrieveAll();
    },
    error: err => console.log('Error', err)
  })
}

  set filter(value: string) {
    this._filterBy = value;
    this.filteredCourses = this._courses.filter(
      (course: Course) =>
        course.name
          .toLocaleLowerCase()
          .indexOf(this._filterBy.toLocaleLowerCase()) > -1
    );
  }

  get filter() {
    return this._filterBy;
  }
}
