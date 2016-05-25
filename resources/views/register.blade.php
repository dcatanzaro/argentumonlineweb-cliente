@extends('layouts.layout')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
@endsection

@section('content')
    <div class="contentLeft">
        <div class="shadow">
            <h4>Registro</h4>
            <div class="register">
                <form method="POST">
                    @if($errors->has())
                        @foreach ($errors->all() as $error)
                            <p style="text-align: left;">- {{ $error }}</p>
                        @endforeach
                    @endif

                    <div class="groupInput">
                        <label for="">USUARIO </label>
                        <input type="text" class="inputText" name="nameAccount" value="{{ old('nameAccount') }}">
                    </div>

                    <div class="groupInput">
                        <label for="">CONTRASEÑA </label>
                        <input type="password" class="inputText" name="password">
                    </div>

                    <div class="groupInput">
                        <label for="">RE-CONTRASEÑA </label>
                        <input type="password" class="inputText" name="password_confirmation">
                    </div>

                    <div class="groupInput">
                        <label for="">E-MAIL </label>
                        <input type="text" class="inputText" name="email" value="{{ old('email') }}">
                    </div>
                    
                    <input type="submit" name="nextStep" id="nextStep" class="buttonRegister" value="Registrarse">
                                     
                </form>
            </div>
        </div>
    </div>
@endsection