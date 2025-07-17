import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavbarComponent } from "../../components/layouts/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChildren('animatedElement') elementsToAnimate: QueryList<ElementRef> | undefined;

  skills = [
    { name: 'Angular', icon: 'devicon-angularjs-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'C#', icon: 'devicon-csharp-plain' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
    { name: 'Git', icon: 'devicon-git-plain' },
  ];
  
  certifications = [
    { title: 'Formação Angular Developer', platform: 'Alura', link: '#' },
    { title: 'Spring Boot e API REST', platform: 'Udemy', link: '#' },
    { title: 'Versionamento com Git e GitHub', platform: 'Digital Innovation One', link: '#' },
  ];
  
  private observer?: IntersectionObserver;
  
  constructor(private renderer: Renderer2) {}
  
  ngAfterViewInit() {
    this.type();
    this.setupIntersectionObserver();
    if (this.elementsToAnimate) {
      this.elementsToAnimate.forEach((el: ElementRef) => this.observer?.observe(el.nativeElement));
    }
  }
@ViewChild('typingEffect') typingElementRef: ElementRef | undefined;

  private phrases = [
    "Guilherme Henrique",
    "Desenvolvedor Full Stack",
    "Criador de Soluções",
    "Apaixonado por Café"
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: any; 

  private readonly typingSpeed = 100;
  private readonly deletingSpeed = 50;
  private readonly delayBetweenPhrases = 2000;

  
  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private type(): void {
    const currentPhrase = this.phrases[this.phraseIndex];
    if (!this.typingElementRef) {
      return;
    }
    const element = this.typingElementRef.nativeElement;

    if (!this.isDeleting) {
      element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
      
      if (this.charIndex === currentPhrase.length) {
        this.isDeleting = true;
        this.timeoutId = setTimeout(() => this.type(), this.delayBetweenPhrases);
      } else {
        this.timeoutId = setTimeout(() => this.type(), this.typingSpeed);
      }
    } 
    else {
      element.textContent = currentPhrase.substring(0, this.charIndex);
      this.charIndex--;
      
      if (this.charIndex < 0) {
        this.charIndex = 0;
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length; 
        this.timeoutId = setTimeout(() => this.type(), this.typingSpeed);
      } else {
        this.timeoutId = setTimeout(() => this.type(), this.deletingSpeed);
      }
    }
  }
  private setupIntersectionObserver() {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.2
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'is-visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);
  }
}
