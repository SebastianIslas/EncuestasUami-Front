import React from "react";
import Logo24 from "../Logo24";

export function Header({ user }) {
  return (<div className="hero-content flex-col lg:flex-row px-3 pt-10">
    <Logo24 />

    <div className="text-center">
      <h1 className="text-mg md:text-xl">Bienvenido Administrador <b>{user.id}</b></h1>
    </div>
  </div>);
}
