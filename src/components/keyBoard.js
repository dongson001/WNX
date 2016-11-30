import React from 'react'
class KeyBoard extends React.Component {
    static PropTypes = {
      password: React.PropTypes.array.isRequired,
      handler: React.PropTypes.func.isRequired
    }
    render (){
        const colls = [
            [
                {
                    content: 1,
                    suffix: ''
                },
                {
                    content: 2,
                    suffix: 'ABC'
                },
                {
                    content: 3,
                    suffix: 'DEF'
                }
            ],
            [
                {
                    content: 4,
                    suffix: 'GHI'
                },
                {
                    content: 5,
                    suffix: 'JKL'
                },
                {
                    content: 6,
                    suffix: 'MNO'
                }
            ],
            [
                {
                    content: 7,
                    suffix: 'PQRS'
                },
                {
                    content: 8,
                    suffix: 'TUV'
                },
                {
                    content: 9,
                    suffix: 'WXYZ'
                }
            ],
            [
                {
                    content: 'empty'
                },
                {
                    content: 'zero',
                    suffix: ''
                },
                {
                    content: 'clear'
                }
            ]
        ]
        const { increment, decrement , hide} = this.props
        return (
            <div>
                <div className="keyboard">
                  
                    { colls.map( (row, index) => {
                        return(
                            <ul key={index} className="keyboard-row">
                                { row.map( (cell, index) => {
                                    return(
                                        <li onTouchTap={() => {
                                            switch(cell.content){
                                                case 'clear':
                                                    decrement()
                                                    break
                                                case 'empty':
                                                    break
                                                case 'zero':
                                                    increment(0)
                                                    break
                                                default:
                                                    increment(cell.content)
                                            }
                                        } } key={index} className={((content) => {
                                                switch(content){
                                                    case 'clear':
                                                        return 'clear gray'
                                                    case 'empty':
                                                        return 'gray'
                                                    case 'zero':
                                                        return 'zero'
                                                    default:
                                                        return ''
                                                }
                                            })(cell.content)}>
                                            {(cell.content !== "clear") && (cell.content !== "zero") && (cell.content !== "empty") &&
                                                <div>
                                                    <p className="number">{cell.content}</p>
                                                    <p className="letter">{cell.suffix}</p>
                                                </div>
                                            }
                                            {cell.content == "zero" &&
                                                <div>
                                                    <p>0</p>
                                                </div>
                                            }
                                            {cell.content == "clear" &&
                                                <div className="clearIcon"><i></i></div>
                                            }
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default KeyBoard
