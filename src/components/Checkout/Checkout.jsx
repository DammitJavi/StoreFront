import { useState } from 'react'

export default function Checkout({ cartTotal }) {

    const [value, setValue] = useState('Example: John')
    console.log(cartTotal);
    return(
        <div className='text-textColor p-3'>
            <div className=' text-center'>
                <h1 className="pl-2">Full name (First and Last name)</h1>
                <input
                    type="input"
                    className="border border-textColor w-96 rounded m-1 pl-1"
                    placeholder='Ex: John Doe'
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />
                <h1 className="pl-2">Phone Number</h1>
                <input
                    className="border border-textColor w-96 rounded m-1 pl-1"
                    type="input"
                    placeholder='+1(888)-888-8888'
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />
                <h1 className="pl-2">Address line 1</h1>
                <input
                    className="border border-textColor w-96 rounded m-1 pl-2"
                    type="input"
                    placeholder='Street address or P.O. Box'
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />

                <h1 className="pl-2">Address line 2</h1>

                <input
                    className="border border-textColor w-96 rounded m-1 pl-1"
                    type="input"
                    placeholder='Apt, suite, unit, building, floor, etc.'
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />
                <div className="flex justify-center" >
                    <div>
                        <h1 className="pl-2">City</h1>
                        <input
                            className="border border-textColor max-w-fit rounded m-1"
                            type="input"
                            // value={this.state.value}
                            // onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <h1 className="pl-2">ZIP Code</h1>

                        <input
                            className="border border-textColor max-w-fit rounded m-1"
                            type="input"
                            // value={this.state.value}
                            // onChange={this.handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <h1 className="pl-2">Card Number</h1>

                <input
                    className="border border-textColor w-60 rounded m-1 pl-1"
                    type="input"
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />
                <h1 className='pl-2'>Name on Card</h1>
                <input
                    className="border border-textColor w-60 rounded m-1 pl-1"
                    type="input"
                    // value={this.state.value}
                    // onChange={this.handleChange}
                />
                <h1 className='pl-2'>Expiration Date</h1>
            </div>
            <div className='text-center'>
                <button className='border border-textColor rounded-2xl m-2 p-1'>
                    Place Order
                </button>
            </div>
        </div>
    );
}