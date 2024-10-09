import { memo, useCallback, useEffect, useState } from "react";
import moment from 'moment-timezone';

function CarouselAnswerCard({ answer = "", char_count = 100 }) {
    const [value, setValue] = useState("");
    const [readmore, setReadmore] = useState(false);

    useEffect(() => {
        if (!answer) return;

        onReadMore();
    }, [answer]);

    const onReadMore = useCallback(() => {

        if (readmore) {
            setReadmore(false);
            setValue(answer);
            return;
        }

        const _value = answer.length > char_count ? `${answer.slice(0, char_count).trim()}... ` : answer;
        setValue(_value);
        setReadmore(answer.length > char_count ? true : false);
    }, [answer, readmore, char_count]);

    return (
        <p>
            {value}
            {
                answer && answer.length > char_count ?
                    <span className={"blossom-cursor blossom-link-color"} onClick={onReadMore}>
                        {readmore ? "   show more" : "   show less"}
                    </span> : null
            }
        </p>
    )
}

export default memo(CarouselAnswerCard);