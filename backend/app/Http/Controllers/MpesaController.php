<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MpesaController extends Controller
{
    private $shortcode = '174379'; // sandbox shortcode
    private $passkey = 'YOUR_PASSKEY'; // sandbox passkey
    private $callbackUrl = 'https://yourdomain.com/api/stkpush/callback';

    private $consumerKey = '2AAwsd7kggUhkyCSiOqQsqEuXsPkGVf8rkDASEmUVnLDdHUC';
    private $consumerSecret = 'fdvGbOHPgduy78IAvaX8RGhtLrN0OtkltQNhnA6UuWWcfTHDIp409RsjZod8w0Pl';

    // Step 1: Get OAuth token
    private function getAccessToken()
    {
        $response = Http::withBasicAuth($this->consumerKey, $this->consumerSecret)
            ->get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');

        if ($response->ok()) {
            return $response->json()['access_token'];
        }

        return null;
    }

    // Step 2: Initiate STK Push
    public function stkPush(Request $request)
    {
        $request->validate([
            'phone' => 'required|digits:12', // e.g., 2547XXXXXXXX
            'amount' => 'required|numeric|min:1',
        ]);

        $phone = $request->phone;
        $amount = $request->amount;

        $token = $this->getAccessToken();
        if (!$token) return response()->json(['error' => 'Unable to get token'], 500);

        $timestamp = now()->format('YmdHis');
        $password = base64_encode($this->shortcode . $this->passkey . $timestamp);

        $stkResponse = Http::withToken($token)->post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', [
            'BusinessShortCode' => $this->shortcode,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => 'CustomerPayBillOnline',
            'Amount' => $amount,
            'PartyA' => $phone,
            'PartyB' => $this->shortcode,
            'PhoneNumber' => $phone,
            'CallBackURL' => $this->callbackUrl,
            'AccountReference' => 'OrderPayment',
            'TransactionDesc' => 'Payment for order'
        ]);

        return $stkResponse->json();
    }

    // Step 3: Handle STK Callback
    public function callback(Request $request)
    {
        $data = $request->all();
        Log::info('MPESA STK CALLBACK:', $data);

        // You can save this to database here

        return response()->json(['status' => 'success']);
    }
}
