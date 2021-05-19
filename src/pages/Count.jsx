import React, { useEffect } from 'react';

const Count = () => {

    // useEffect(() => {
    //     // 修改一，在loop前面加一个星号
    //     function* loop() {
    //         for (let i = 0; i < 5; i++) {
    //             // 修改二：在输出前面加yield
    //             yield console.log(i)
    //         }
    //     }
    //     // 修改三：定义一个变量将loop赋值给l
    //     const l = loop()

    //     // 这个时候并没有输出，若要输出调用next方法
    //     // l.next() // 0
    //     // l.next() // 1
    //     // l.next() // 2
    //     // l.next() // 3
    //     // l.next() // 4
    //     // l.next() // 之后不会输出任何东西
    // }, []);

    useEffect(() => {
        function* gen() {
            let val
            val = yield 1
            console.log(val)
        }

        const l = gen()
        // "Generator { }"

        l.next() // 没有任何输出
        l.next() // undefined  yield表达式没有返回值，所以返回undefined
    }, []);

    return (
        <div>
            generator
        </div>
    );
}

export default Count;
