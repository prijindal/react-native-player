package com.musicplayer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.media.MediaMetadataRetriever;

import java.util.Map;

public class MediaMetadataRetrieverModule extends ReactContextBaseJavaModule {
   public MediaMetadataRetrieverModule(ReactApplicationContext reactContext) {
     super(reactContext);
   }

  @Override public String getName() {
    return "MediaMetadataRetriever";
  }

  @ReactMethod
  public void retrieveMedia(String filePath, Promise promise) {
    MediaMetadataRetriever mmr = new MediaMetadataRetriever();
    mmr.setDataSource(filePath);

    WritableMap map = Arguments.createMap();
    try {
      map.putString("album", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM));
      map.putString("artist", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST));
      map.putString("albumartist", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUMARTIST));
      map.putString("author", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_AUTHOR));
      map.putString("captureFramerate", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_CAPTURE_FRAMERATE));
      map.putString("date", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DATE));
      map.putString("duration", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));
      map.putString("title", mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE));
      promise.resolve(map);
    } catch(IllegalArgumentException e) {
      promise.reject(e);
    }
  }
}
