@extends('layouts.layout')

@section('content')

<?php $countNoticias = 0;?>

<script>
    function expandNoticia(tis, id){
        if ($(tis).hasClass('rotate180')){
            $('#noticia_' + id).hide();
            $(tis).removeClass('rotate180');
        } else {
            $('#noticia_' + id).show();
            $(tis).addClass('rotate180');
        }
    }
</script>
@endsection