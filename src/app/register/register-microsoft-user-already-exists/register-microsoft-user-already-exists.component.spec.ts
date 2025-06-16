import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterMicrosoftUserAlreadyExistsComponent } from './register-microsoft-user-already-exists.component';
import { MatCardModule } from '@angular/material/card';
import { StandaloneLogoComponent } from '../../common/standalone-logo/standalone-logo.comonent';

describe('RegisterMicrosoftUserAlreadyExistsComponent', () => {
  let component: RegisterMicrosoftUserAlreadyExistsComponent;
  let fixture: ComponentFixture<RegisterMicrosoftUserAlreadyExistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMicrosoftUserAlreadyExistsComponent],
      imports: [MatCardModule, StandaloneLogoComponent]
    });
    fixture = TestBed.createComponent(RegisterMicrosoftUserAlreadyExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
