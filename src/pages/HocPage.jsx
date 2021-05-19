import React, { Component } from 'react';

const foo = Cmp => props => {
    return (
        <div style={{ border: 'solid 1px #e85353' }}>
            <Cmp {...props} />
        </div>
    )
}

const foo2 = Cmp => props => {
    return (
        <div style={{ border: 'solid 1px #9ce29b' }}>
            <Cmp {...props} />
        </div>
    )
}

const Child = (props) => {
    return <div>Child {props.name}</div>
}


@foo2
@foo
class Child2 extends Component {
    render() {
        return <div>Child {this.props.name}</div>
    }
}

const Foo = foo(Child);

const Foo2 = foo2(foo(Child));

class HocPage extends Component {
    render() {
        return (
            <div>
                <h3>HocPage</h3>
                {/* <Foo name='Foo' />
                <Foo2 name='Foo2' /> */}
                <Child2 />
            </div>
        );
    }
}

export default HocPage;

