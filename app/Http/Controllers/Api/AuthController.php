<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * SIGNUP
     */
    public function signup (SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */

        try
        {
            $user = User::create([
                'name' => $data['name'], // brackets when dealing with an array in PHP
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            $token = $user->createToken('main')->plainTextToken;
        }
        catch (\Exception $exception)
        {
            \Log::info(['AuthController@login', $exception->getMessage()]);

            return [
                'success' => false,
                'msg' => 'problem'
            ];
        }

        return [
            'success' => true,
            'user' => $user,
            'token' => $token,
        ];
    }

    /**
     * LOGIN
     */
    public function login (LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials))
        {
            return response ([
                'success' => false,
                'message' => 'Provided email address or password incorrect'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return [
            'success' => true,
            'user' => $user,
            'token' => $token,
        ];
    }

    /**
     * LOGOUT
     */
    public function logout (Request $request)
    {
        /** @var User $user */

        $user = $request->user();

        $user->currentAccessToken()->delete();

        return [
            'success' => true
        ];
    }
}
