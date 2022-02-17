import { Course } from './course';
import { CourseService } from './course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './course-info.component.html',
})
export class CourseInfoComponent implements OnInit {
  // Interface OnInit. Interface é como um contrato.
  // Lê-se: A Classe CourseInfoComponent é obrigada a implementar a Interface(ou Classe?) OnInit

  course: Course;
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {} // constructor é o 1º método a ser carregado
  ngOnInit(): void {
    // void(vazio em inglês) é utilizado quando não retorna valor nem mesmo valor nulo
    //this.course = this.courseService.retrieveById(
    //  +this.activatedRoute.snapshot.paramMap.get('id')
    //); // o (+) converte para number
    this.courseService
      .retrieveById(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (course) => (this.course = course),
        error: (err) => console.log('Error', err),
      });
  }

  save(): void {
    this.courseService.save(this.course).subscribe({
      next: (course) => console.log('Saved with success!', course),
      error: (err) => console.log('Error', err),
    });
  }
}
