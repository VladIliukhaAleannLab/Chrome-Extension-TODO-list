import React, {useState} from 'react';

export default (initState) => {
    const [value, setValue] = useState(initState || '');

    const onChange = (e) => setValue(e.target.value);

    return {value, onChange}
}
