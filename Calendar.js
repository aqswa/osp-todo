import React,{useState} from 'react';
import Calendar from 'react-calendar';

const calendar = () => {
    const [value, onChange] = useState(new Date());
    const onchange = date => setdate(date);

    return (
        <div>
            <Calendar
            onChange={onChange}
            value = {value}/>
         </div>
    );
};

export default Calendar;

//Text strings must be rendered within a <Text> component <- 에러 발생..