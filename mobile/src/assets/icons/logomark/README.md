## Process for generating the app icon files

1. Open this Figma component: https://www.figma.com/file/55stZrtP8xqRNT0TPhHnu3/Wenn?type=design&node-id=307-579&mode=design&t=FfS9RQ8AFjGMDxra-0
2. Click on the screen, and export the SVG and PNG files. Save them to this directory to update the `App Icon.{png,svg}` assets in version control
3. Upload the `App Icon.png` file, which should be 1536px square, to https://makeappicon.com/
4. Import to iOS: In Xcode, open the `Images.xcassets` file, right click and choose `Import`, then import the `AppIcon.appiconset` from the makeappicon download
5. TODO: Android instructions