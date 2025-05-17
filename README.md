# AI History Timeline Widget

An interactive educational widget designed for 3rd-grade students to learn about the history of Artificial Intelligence through a drag-and-drop timeline activity.

## Overview

This widget allows students to arrange historical AI events in chronological order. It features:
- Drag-and-drop functionality
- Interactive cards with emojis/images
- Immediate feedback
- Reset capability
- Responsive design
- Kid-friendly interface

## File Structure

```
ai-timeline-widget/
├── index.html        # Main HTML structure
├── styles.css        # Styling and animations
├── script.js         # Game logic and event handling
└── README.md         # This documentation
```

## How It Works

1. Students are presented with shuffled event cards at the top of the screen
2. They drag and drop cards into timeline slots below
3. Cards can be:
   - Moved from the top container to any slot
   - Swapped between timeline slots
   - Moved back to the top container
4. Students can check their answer or reset the game at any time

## Customization Guide

### Adding or Modifying Events

Edit the `timelineEvents` array in `script.js`:

```javascript
const timelineEvents = [
    {
        year: "1950",
        event: "Description of the event",
        image: "🤔"  // Can be emoji or image object
    }
    // Add more events here
];
```

### Using Images Instead of Emojis

Replace emoji with an image object:

```javascript
{
    year: "1950",
    event: "Description",
    image: {
        src: "path/to/image.png",
        alt: "Image description"
    }
}
```

### Styling Modifications

#### Colors
The widget uses CSS variables for easy color customization. In `styles.css`:

```css
:root {
    --blue: rgb(92, 113, 242);
    --blue-dark: rgb(51, 56, 118);
    /* ... other color variables ... */
}
```

#### Card Appearance
Modify card styles in `styles.css`:
- `.card` - Basic card styling
- `.card .image-container` - Image/emoji container
- `.card .year` - Year display
- `.card .event` - Event description

#### Timeline Appearance
Customize timeline in `styles.css`:
- `.timeline-container` - Overall timeline container
- `.timeline::before` - The timeline line
- `.timeline-slot` - Individual slot styling

### Responsive Breakpoints

Mobile responsiveness can be adjusted in the media query section of `styles.css`:

```css
@media (max-width: 768px) {
    /* Mobile-specific styles */
}
```

## Accessibility Features

- Semantic HTML structure
- Clear visual hierarchy
- High contrast colors
- Responsive text sizing
- Clear feedback messages
- Keyboard-friendly interactions

## Browser Support

The widget works in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

### Adding New Features

1. **New Card Types**
   - Add new properties to the timelineEvents objects
   - Update the createCard function in script.js
   - Add corresponding styles in styles.css

2. **Additional Interactions**
   - Add event listeners in script.js
   - Update the handleDrop function for new interaction types

3. **Visual Enhancements**
   - Add new CSS classes in styles.css
   - Update existing classes as needed
   - Maintain the existing color scheme using CSS variables

### Best Practices

- Maintain the existing style guide
- Keep language appropriate for 3rd-grade students
- Test any changes on both desktop and mobile devices
- Ensure drag-and-drop functionality works smoothly
- Maintain clear feedback for student actions

## Troubleshooting

Common issues and solutions:

1. **Cards not dragging:**
   - Check if `draggable="true"` is set
   - Verify event listeners are properly attached

2. **Styles not applying:**
   - Check CSS class names match HTML
   - Verify CSS file is properly linked

3. **Images not showing:**
   - Verify file paths are correct
   - Check image object structure matches expected format

## Future Enhancements

Potential areas for improvement:

1. Add sound effects for interactions
2. Implement a scoring system
3. Add animation transitions
4. Create multiple difficulty levels
5. Add a timer option
6. Include more interactive elements

## Support

For questions or issues:
1. Check the troubleshooting section
2. Review the customization guide
3. Contact the development team

---

Created for HelloWorldCS educational purposes. Feel free to modify and enhance as needed for your classroom requirements. 