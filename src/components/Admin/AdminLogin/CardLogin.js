export default function CardLogin(props) {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="flex-col justify-center hero-content lg:flex-row">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    {props.children}
                </div>
                </div>
            </div>
        </div>       
    );
}