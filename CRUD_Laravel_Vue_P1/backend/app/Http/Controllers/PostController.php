<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = auth()->user()->posts()->orderby('created_at', 'desc')->paginate(2);
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string', 'max:255'],
            'body' =>['required','string']
        ]);

        $data['slug'] = Str::slug($data['title']);

        auth()->user()->posts()->create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $slug)
    {
        return PostResource::make(Post::where('slug', $slug)->with('user')->firstOrFail());

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $post = Post::where('slug', $slug)->with('user')->firstOrFail();
        $data = $request->validate([
            'title' => ['required','string', 'string'],
            'body' =>['required','string']
        ]);
        $data['slug'] = Str::slug($data['title']); // updating the slug same as the title combining with -s
        $post->update($data);
        return PostResource::make($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
