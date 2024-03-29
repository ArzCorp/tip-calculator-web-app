import { html, css, LitElement } from 'lit'

import '../components/app-input.js'
import '../components/simple-button.js'
import { generalStyles } from '../utils/generalStyles.js'

class TipCalculator extends LitElement {
	static get is() {
		return 'tip-calculator'
	}

	static get properties() {
		return {
			bill: { type: Number },
			people: { type: Number },
			tipAmount: { type: Number },
			tipPercentage: { type: Number },
		}
	}

	static get styles() {
		return [
			generalStyles,
			css`
				.tip-calculator-container {
					max-width: 700px;
					min-width: 700px;
					display: grid;
					grid-template-columns: 1fr 1fr;
					background-color: #fff;
					border-radius: 10px;
					padding: 20px;
				}

				.tip-calculator-amount-container {
					color: white;
					margin-left: 20px;
					border-radius: 10px;
					background-color: #00464b;
					padding: 20px;
				}

				.tip-calculator-buttons-container {
					width: 100%;
					margin: 30px 0px;
					display: grid;
					gap: 10px;
					grid-template-columns: repeat(3, 1fr);
				}

				.tip-calculator-amount {
					display: flex;
					justify-content: space-between;
				}

				.tip-calculator-amount-number {
					font-size: 3.3rem;
					margin: 0px;
				}
			`,
		]
	}

	constructor() {
		super()
		this.bill = 0
		this.people = 0
		this.tipAmount = 0
		this.tipPercentage = 0
	}

	get tipPerPerson() {
		if (this.bill && this.people && this.tipPercentage) {
			const result = (this.bill * this.tipPercentage) / this.people
			return parseFloat(result.toFixed(2))
		} else {
			return 0
		}
	}

	get totalPerPerson() {
		if (this.bill && this.people && this.tipPerPerson) {
			const result = this.bill / this.people + this.tipPerPerson
			return parseFloat(result.toFixed(2))
		} else {
			return 0
		}
	}

	render() {
		return html`<div class="tip-calculator-container">
			<div>
				<app-input
					label="Bill"
					type="number"
					.change="${(e) => {
						this.bill = parseFloat(e.target.value)
					}}"
				></app-input>
				<div class="tip-calculator-buttons-container">
					<simple-button
						?active="${this.tipPercentage === 0.05}"
						.click="${() => {
							this.tipPercentage = 0.05
						}}"
						>5%</simple-button
					>
					<simple-button
						?active="${this.tipPercentage === 0.1}"
						.click="${() => (this.tipPercentage = 0.1)}"
						>10%</simple-button
					>
					<simple-button
						?active="${this.tipPercentage === 0.15}"
						.click="${() => {
							this.tipPercentage = 0.15
						}}"
						>15%</simple-button
					>
					<simple-button
						?active="${this.tipPercentage === 0.25}"
						.click="${() => {
							this.tipPercentage = 0.25
						}}"
						>25%</simple-button
					>
					<simple-button
						?active="${this.tipPercentage === 0.5}"
						.click="${() => {
							this.tipPercentage = 0.5
						}}"
						>50%</simple-button
					>
					<app-input
						type="number"
						.change="${(e) => {
							this.tipPercentage = parseFloat(e.target.value / 100)
						}}"
					></app-input>
				</div>
				<app-input
					label="Number of people"
					type="number"
					.change="${(e) => {
						this.people = parseFloat(e.target.value)
					}}"
				></app-input>
			</div>
			<div class="tip-calculator-amount-container">
				<div class="tip-calculator-amount">
					<p>
						Tip Amount <br />
						<span>/ person</span>
					</p>
					<p class="tip-calculator-amount-number">$${this.tipPerPerson}</p>
				</div>
				<div class="tip-calculator-amount">
					<p>
						Total <br />
						<span>/ person</span>
					</p>
					<p class="tip-calculator-amount-number">$${this.totalPerPerson}</p>
				</div>
			</div>
		</div>`
	}
}

window.customElements.define(TipCalculator.is, TipCalculator)
