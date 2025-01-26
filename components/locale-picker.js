import {LitElement, css, html} from 'lit';
import {allLocales, allLocalesLabels} from '../localization/locale-codes';
import {getLocale, setLocale} from '../localization/localization';

export class LocalePicker extends LitElement {
  static styles = css`
    select {
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  `;

  render() {
    return html`
      <select @change=${this.localeChanged}>
        ${allLocales.map(
          (locale) =>
            html`<option value=${locale} ?selected=${locale === getLocale()}>
              ${allLocalesLabels[locale]}
            </option>`
        )}
      </select>
    `;
  }

  localeChanged(event) {
    const newLocale = event.target.value;

    setLocale(newLocale);
  }
}
customElements.define('locale-picker', LocalePicker);
