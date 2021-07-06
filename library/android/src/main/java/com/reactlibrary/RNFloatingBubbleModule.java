package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.Bundle;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.content.Intent;
import android.provider.Settings;
import android.net.Uri;
import android.widget.Button;
import android.widget.TextView;


import com.txusballesteros.bubbles.BubbleLayout;
import com.txusballesteros.bubbles.BubblesManager;
import com.txusballesteros.bubbles.OnInitializedCallback;

public class RNFloatingBubbleModule extends ReactContextBaseJavaModule {

    private BubblesManager bubblesManager;
    private final ReactApplicationContext reactContext;
    private BubbleLayout bubbleView;
    public int newData = 1;
    public RNFloatingBubbleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        // try {
        //   initializeBubblesManager();
        // } catch (Exception e) {

        // }
    }

    @ReactMethod
    public void reopenApp() {
        Intent launchIntent = reactContext.getPackageManager().getLaunchIntentForPackage(reactContext.getPackageName());
        if (launchIntent != null) {
            reactContext.startActivity(launchIntent);
        }
    }

    @Override
    public String getName() {
        return "RNFloatingBubble";
    }
    
    public int getNewData() {
        return newData;
    }

    public void setNewData(int newName) {
        this.newData = newName;
        //return newName;
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void passJourney(String x, final Promise promise) {
        try {
            // TextView textviewid = (TextView) bubbleView.findViewById(R.id.textviewid);
            // textviewid.setText(x);
            // Intent intent = new Intent(android.content.Intent.ACTION_VIEW,
            //         Uri.parse("http://maps.google.com/maps?saddr=20.344,34.34&daddr=20.5666,45.345"));
            Intent intent = new Intent(android.content.Intent.ACTION_VIEW,
                    Uri.parse("https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=11.4822236,75.9909821&destination=11.488039,76.0130784"));
//            startActivity(intent);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(intent);
            // sendEvent("floating-bubble-pass-journey-executed");
            promise.resolve("data got is x:- " );
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void showFloatingBubble(int x, int y, final Promise promise) {
        try {
            this.addNewBubble(x, y);
            promise.resolve("");
        } catch (Exception e) {
            promise.reject("");
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void hideFloatingBubble(final Promise promise) {
        try {
            this.removeBubble();
            promise.resolve("");
        } catch (Exception e) {
            promise.reject("");
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void requestPermission(final Promise promise) {
        try {
            this.requestPermissionAction(promise);
        } catch (Exception e) {
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void checkPermission(final Promise promise) {
        try {
            promise.resolve(hasPermission());
        } catch (Exception e) {
            promise.reject("");
        }
    }

    @ReactMethod // Notates a method that should be exposed to React
    public void initialize(final Promise promise) {
        try {
            this.initializeBubblesManager();
            promise.resolve("");
        } catch (Exception e) {
            promise.reject("");
        }
    }

    private void addNewBubble(int x, int y) {
        //final int index = 1;
        //setNewData(x);
        this.removeBubble();
        bubbleView = (BubbleLayout) LayoutInflater.from(reactContext).inflate(R.layout.bubble_layout, null);
        TextView textviewid = (TextView) bubbleView.findViewById(R.id.textviewid);
        textviewid.setText(""+ getNewData());
        bubbleView.setOnBubbleRemoveListener(new BubbleLayout.OnBubbleRemoveListener() {
            @Override
            public void onBubbleRemoved(BubbleLayout bubble) {
                bubbleView = null;
                sendEvent("floating-bubble-remove");
            }
        });
        bubbleView.setOnBubbleClickListener(new BubbleLayout.OnBubbleClickListener() {

            @Override
            public void onBubbleClick(BubbleLayout bubble) {
                sendEvent("floating-bubble-press-irsahd");
            }
        });
        bubbleView.setShouldStickToWall(true);
        bubblesManager.addBubble(bubbleView, x, y);
        Button next = (Button) bubbleView.findViewById(R.id.next);
        next.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {
                // Button next1 = (Button) bubbleView.findViewById(R.id.next);
                // next1.setText("next pressed");
                // TextView textviewid = (TextView) bubbleView.findViewById(R.id.textviewid);
                // textviewid.setText("next pressed");
                sendEvent("floating-bubble-press-next");

            }
        });
        Button done = (Button) bubbleView.findViewById(R.id.done);
        done.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {
                // Button done1 = (Button) bubbleView.findViewById(R.id.done);
                // done1.setText("done pressed");
                //TextView textviewid2 = (TextView) bubbleView.findViewById(R.id.textviewid);
                //textviewid2.setText(index+1);
                TextView textviewid2 = (TextView) bubbleView.findViewById(R.id.textviewid);
                int nextData = getNewData() + 1;
                textviewid2.setText(""+newData);
                
                sendEvent("floating-bubble-press-done");
                setNewData(nextData);
                //index++;
                //x++;
            }
        });
    }

    private boolean hasPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(reactContext);
        }
        return true;
    }

    private void removeBubble() {
        if (bubbleView != null) {
            try {
                bubblesManager.removeBubble(bubbleView);
            } catch (Exception e) {

            }
        }
    }


    public void requestPermissionAction(final Promise promise) {
        if (!hasPermission()) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + reactContext.getPackageName()));
            Bundle bundle = new Bundle();
            reactContext.startActivityForResult(intent, 0, bundle);
        }
        if (hasPermission()) {
            promise.resolve("");
        } else {
            promise.reject("");
        }
    }

    private void initializeBubblesManager() {
        bubblesManager = new BubblesManager.Builder(reactContext).setTrashLayout(R.layout.bubble_trash_layout)
                .setInitializationCallback(new OnInitializedCallback() {
                    @Override
                    public void onInitialized() {
                        // addNewBubble();
                    }
                }).build();
        bubblesManager.initialize();
    }

    private void sendEvent(String eventName) {
        WritableMap params = Arguments.createMap();
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}