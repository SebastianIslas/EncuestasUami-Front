import { useState } from "react";

export default function InputPassword(props) {
    const [visible, setVisible] = useState(false);

    const handleShow = () => {
        if(visible)
         setVisible(false) 
        else
         setVisible(true)
    }
    return (   
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.name}</span>
            </label> 
            <div className="input-group border-indigo-500/10">
                <input type={visible ? 'text' : 'password'} ref={props.inputRef} placeholder={props.placeHolderText} className="input input-bordered w-5/6 placeholder-shown:italic" />
                <label className="swap w-1/6 bg-base-200 border border-neutral-focus">
                    <input onChange={handleShow} type="checkbox" />
                    <div className="swap-on">◎</div>
                    <div className="swap-off">◉</div>
                </label>
            </div>
            <a href="/recuperarPass" className="text-xs font-normal text-slate-500 pt-2">Olvide mi contraseña</a>
                {props.info}
        </div>       
    );
}