import { Component } from '@angular/core';
import { EXPERIENCES, PROJECTS, SKILLS } from '../data/portfolio-content';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
})
export class HomePage {
  protected readonly experiences = EXPERIENCES;
  protected readonly projects = PROJECTS;
  protected readonly skills = SKILLS;
}
