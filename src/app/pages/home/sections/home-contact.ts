import { Component } from '@angular/core';
import { ContactFormBehavior } from '../../contact-form-behavior';

@Component({
  selector: 'sl-home-contact',
  template: `
    <section class="contact" id="contact">
      <div class="inner contact-inner">
        <div class="eyebrow">Get in touch</div>
        <h2>Bookings &amp; enquiries</h2>
        <p class="section-lead">
          Tell us a little about your stay and we'll get back to you. For bookings, choose
          "Reservation" and it goes straight to our reservations team.
        </p>

        <dl class="contact-details">
          <dt>Phone</dt>
          <dd><a href="tel:+46857239120">+46 8 572 391 20</a></dd>
          <dt>Enquiries</dt>
          <dd><a href="mailto:info.lidingo@storyliving.se">info.lidingo&#64;storyliving.se</a></dd>
          <dt>Reservations</dt>
          <dd><a href="mailto:reservations@storyliving.se">reservations&#64;storyliving.se</a></dd>
        </dl>
        <p class="contact-or">Or send us a message using the form below.</p>

        @if (formState() === 'success') {
          <p class="form-success">Thank you — your message is on its way. We'll be in touch shortly.</p>
          <button type="button" class="submit-btn" (click)="resetForm()">Send another message</button>
        } @else {
          <form class="contact-form" (submit)="onSubmit($event)" novalidate>
            <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <input type="hidden" name="segment" value="Family &amp; Vacation" />

            <p class="req-note">Fields marked <span class="req">*</span> are required.</p>

            <div class="field">
              <label for="cf-name">Name <span class="req">*</span></label>
              <input id="cf-name" name="name" type="text" autocomplete="name" [class.invalid]="!!fieldErrors()['name']" />
              @if (fieldErrors()['name']) { <p class="field-error">{{ fieldErrors()['name'] }}</p> }
            </div>
            <div class="field">
              <label for="cf-email">Email <span class="req">*</span></label>
              <input id="cf-email" name="email" type="email" autocomplete="email" [class.invalid]="!!fieldErrors()['email']" />
              @if (fieldErrors()['email']) { <p class="field-error">{{ fieldErrors()['email'] }}</p> }
            </div>
            <div class="field">
              <label for="cf-phone">Phone <span class="opt">(optional)</span></label>
              <input id="cf-phone" name="phone" type="tel" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="cf-regarding">Regarding</label>
              <select id="cf-regarding" name="regarding">
                <option value="enquiry">General enquiry</option>
                <option value="reservation">Reservation</option>
              </select>
            </div>
            <div class="field field-full">
              <label for="cf-message">Message <span class="req">*</span></label>
              <textarea id="cf-message" name="message" rows="5" [class.invalid]="!!fieldErrors()['message']"></textarea>
              @if (fieldErrors()['message']) { <p class="field-error">{{ fieldErrors()['message'] }}</p> }
            </div>
            <div class="field field-full">
              <div id="recaptcha-container"></div>
              @if (fieldErrors()['human']) { <p class="field-error">{{ fieldErrors()['human'] }}</p> }
            </div>

            @if (formState() === 'error' && formError()) {
              <p class="form-error">{{ formError() }}</p>
            }

            <button type="submit" class="submit-btn" [disabled]="formState() === 'sending'">
              {{ formState() === 'sending' ? 'Sending…' : 'Send message' }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
})
export class HomeContactComponent extends ContactFormBehavior {}
