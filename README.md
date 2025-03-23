Feature Specification V3 - March 2025
Below is the revised Feature Specification V3 - March 2025, incorporating the new changes while preserving the original structure and content you shared. The new additions are seamlessly integrated into the relevant sections, with a dedicated subsection for the card stack and interaction features.

PHONE VERIFICATION
Implementation:
20-second phone signup flow with OTP verification.
Primary authentication method for all users.
WhatsApp alternative pathway with conversion prompts.
Contextual value display before verification request.
User Benefits:
Reduced friction (vs. email verification).
Single-tap verification on iPhone.
Instant account access without profile creation.
Progressive data collection during usage.

TAG SYSTEM V1
Auto-Tag Recognition: Detect intentions from natural language conversation.
Tag Hierarchy: Primary (Location, Budget, Rooms) and Secondary (Features) tags.
Interactive Management: Tap tags to edit criteria without restarting.
Sharable Tag Sets: "Critères Partagés" mechanism for social distribution.

COLLABORATIVE DECISION SYSTEM
"Cercle de Décision": Multi-user property evaluation framework.
Decision Heatmaps: Visual representation of group preferences.
Role Assignment: Collaborator specialization (financial, location expert).
Bilateral Rewards: Premium features for both referrer and referee.

REJECTION MANAGEMENT V1
Recovery Interface: "Previously Declined" section with filtering.
Rejection Classification: Quick-select reason when rejecting properties.
Immediate Undo: Prominent option after left-swipe.
Group Recovery: Collaborative reconsideration of rejected properties.

LOCATION INTELLIGENCE V1
User-Generated Insights: "Expertise Locale" neighborhood knowledge system.
Verification Mechanisms: Community validation of contributed insights.
Expert Recognition: "Connaisseur Local" badges for trusted contributors.
Localized Alerts: Neighborhood-specific updates and insights.

PWA OPTIMIZATION V1
Offline Capabilities: Basic browsing without connection.
Cross-Device Synchronization: Consistent experience across platforms.
Installation Prompts: Strategic PWA installation suggestions.
Progressive Loading: Critical-path optimization for core features.

GROWTH MECHANISMS V1
Phone-First Ambassador Program: Progressive rewards for referrals.
"Moments Immobiliers": Shareable milestone achievements.
WhatsApp Integration: Property alerts and sharing capabilities.
Decision Circle Expansion: Incentives for adding multiple collaborators.

CARD STACK AND INTERACTION
Card Stack:
Square property cards displayed in a fan stack (top card fully visible, others slightly rotated and scaled).
Only the top card is swipeable (left for reject, right for save).
Includes an instruction card (first card) and a promo card (last card).
Action Buttons:
Four buttons on each property card: Info, Call, Share, Web.
Vertically stacked on the right side of the card.
Each button triggers a half-screen slide-up modal.
Device Viewport Considerations
Modal height must be exactly 50% of the device viewport height, not the browser window
Modal should respect iOS safe areas (notch, home indicator)
Modal should use viewport units (vh) rather than percentage-based heights
iOS-Specific Behaviors
Add proper iOS-style spring animations (slightly more bounce than current)
Implement native-feeling drag-to-dismiss gesture
Respect iOS touch feedback patterns

Instruction Card:
First card in the stack with an SVG image teaching swipe mechanics (e.g., "Swipe right to save, left to reject").
Features a loading indicator in the bottom-right corner while properties load.
Promo Card:
Last card in the stack encouraging premium sign-up.
Blue background with a "Sign up with phone" button linking to phone verification.
Tinder-like Swipe Effect:
Cards exit on a curved path with rotation just like tinder esxperience.
Right swipe triggers a red heart animation; left swipe triggers a gray broken heart animation.

Tinder-like Swipe Function

Natural Arc Motion: Cards follow a curved path when swiped (not just straight left/right or left/right then down)
Progressive Rotation: Rotation angle increases as the card moves further from center
Velocity-Based Decision: Cards use both distance and velocity to determine if swipe completes
Visual Feedback:

Red heart animation appears centered when swiped right https://p129.p0.n0.cdn.zight.com/items/nOurdnR1/dda6975b-4cbd-4ee4-b6a0-fdb4e40877ed.svg?v=b8d7727135f3ba2efdedc7a91c06588a
Gray broken heart animation appears centered when swiped left
https://p129.p0.n0.cdn.zight.com/items/6qupKPZb/f43dadd4-28a0-497b-978e-95211e258a71.svg?v=516e7098d6fc59cf68466fa4ce4da63f

Heart animations fade in quickly and fade out slowly over 1 second


Elastic Motion: Card has slight "spring" resistance when dragged
Smooth Exit: When threshold is passed, card smoothly accelerates off-screen

Loading Indicator for Instruction Card
https://p129.p0.n0.cdn.zight.com/items/QwuzqkZD/60703eb1-316d-492b-b871-34e057d4b005.gif?v=1c645286732211ca2e6c23614e8f3c9f


Position: Small spinner in bottom-right corner of the instruction card
Behavior:

Visible only while properties are being fetched
Spins continuously until data is loaded
Disappears when properties are ready with instruction card


Card Behavior:
Instruction card remains in place and is not swipeable during loading
Once properties are loaded, instruction card becomes swipeable
Subtle animation (slight bounce) indicates when swiping becomes available


IMPLEMENTATION SEQUENCE
Phase 1: Core Experience (1-2 months):
PWA with conversational interface and tag detection.
Phone verification system.
Basic property swiping with action buttons, card stack, and Tinder-like swipe effect.
Property certification display (1-5 rating).
Phase 2: Growth Acceleration (3-4 months):
"Cercle de Décision" collaborative framework.
"Critères Partagés" sharing mechanism.
WhatsApp integration for alerts and sharing.
Phone ambassador program with tiered rewards.
Phase 3: Marketplace Expansion (5-6 months):
Agent acquisition tools and dashboard.
"Expertise Locale" neighborhood knowledge system.
Advanced collaborative features with role assignment.
"Moments Immobiliers" achievement sharing.
Phase 4: Platform Evolution (7+ months):
Native app development (conditional on PWA performance).
Advanced agent tools and premium placement.
Community-driven neighborhood insights.
Cross-platform synchronization enhancements.

KEY PRINCIPLES
Mobile-first PWA design optimized for conversational interface.
Embedded viral mechanisms at natural user journey touchpoints.
Dual-sided marketplace balancing user and agent value.
Data protection with reference-only property storage.
Progressive feature disclosure based on engagement level.

Notes: This specification reflects our strategic pivot to PWA-first development with phone verification and embedded growth mechanisms, while maintaining the core value proposition of conversational property search. The new card stack and interaction features enhance user engagement and align with the Tinder-like swipe paradigm.



Quick Specs: Property List & 3/4 Modal View
Mes Biens (My Properties) Feature
Three-Tab Navigation:
Tabs: "Liked" (default), "Seen", "Unseen"
Tab bar positioned at top of screen with active indicator
Switching tabs animates content transition
Property List View:
Vertical scrolling list of saved properties
Each list item shows thumbnail, key property details, and rating
Optimized for quick scanning of saved properties
Three-Quarter Screen Modal:
Modal height: 75% of device viewport (not browser window)
Extends beyond device frame in visual representation
Respects iOS safe areas (notch, home indicator)
Includes drag handle for dismissal
iOS PWA Considerations:
Uses viewport height units for proper device sizing
Implements iOS-style spring animations and gestures
Ensures bottom content is accessible above home indicator

External Property Link Feature Specification
WebView Modal for External Property Links
User clicks the globe icon/web button on a property card
A WebViewModal slides up within the iPhone viewport
The external site (SeLoger.com) loads in the iframe
Device Viewport Considerations
Modal height must be exactly 75% of the device viewport height, not the browser window
Modal should respect iOS safe areas (notch, home indicator)
Modal should use viewport units and percentages for proper sizing across devices
WebView UI Elements
Navigation bar with:
Back button
Forward button
Refresh button
Title showing the external site name
Close button
Loading indicator displays while page is loading
Iframe content displays the external website within the modal
iOS-Specific Behaviors
Clean iOS-style spring animations with appropriate bounce
Native-feeling drag-to-dismiss gesture
Proper respect for iOS touch feedback patterns
Proper handling of safe areas
Content Interaction
External site will receive click events via sandbox attributes
Users can navigate the external site using the provided controls
Users can interact with forms and content on the external site
External site is contained within the application experience
Technical Notes
Uses iframe with appropriate sandbox attributes:
allow-same-origin: Maintains the site's original security context
allow-scripts: Enables JavaScript in the iframe
allow-forms: Lets users fill out forms on the external site
allow-popups: Permits the site to open popups if needed
This feature enhances the user experience by allowing seamless viewing of external property listings without leaving the application.

Property Management Feature Specification
Overview
The French Property Finder application has two complementary ways for users to interact with properties: through the conversational interface with property stack, and through the organized "Mes Biens" (My Properties) section that categorizes properties based on user interaction.
Primary Features
1. Chat & Property Stack Flow
Conversational Interface: Users search for properties via chat
Persistent Results: Property stacks remain in chat history for future reference
Quick Access: Tapping a property card or info button slides up the detailed property view modal
Direct Interaction: Swiping right likes a property, swiping left dismisses it to “seen”
2. Mes Biens (My Properties) Organization
Tab Navigation: Three tabs at the top of screen:
Liked: Properties the user has actively liked (default tab)
Seen: Properties the user has viewed but not liked
Unseen: New properties matching criteria not yet viewed
Property List View: Compact rectangular cards showing:
Property image thumbnail
Price and key specifications (size, bedrooms)
Address and brief description
Visual status indicator (heart, eye, etc.)
3. Property Detail View (3/4 Modal)
Access Methods:
Tapping a property card in any view
Tapping info button on a card
Modal Presentation: Slides up to cover 3/4 of screen
Content Sections:
Image gallery with rating badge
Property title and address
Price, size, bedrooms information
Like/heart button
Features displayed as pill-shaped tags
Certification score with explanation
Agent information with contact option
Market intelligence section
Follow/Contact CTAs
Tabbed navigation (Details, Map, Floor Plan, Photos)
Full description
Bullet-point key features list
Similar properties section
User Flow & Interactions
Property State Transitions
When a user swipes right or taps the heart icon: Property moves to "Liked" tab
When a user views a property detail: Property moves from "Unseen" to "Seen" (if not already liked)
When a user unlikes a property: Property moves from "Liked" to "Seen"
Navigation Connections
Property Card → Detail View: Tapping any property card opens its detail view
Detail View → Mes Biens: Button in detail view to access Mes Biens section
Navbar → Mes Biens: Direct access from main navigation bar
Visual & UX Specifications
List View Format: Vertically stacked rectangular cards (as shown in provided image)
Detail View Style: Comprehensive 3/4 modal with rich information (as shown in second image)
Interactive Elements: Clear touch targets for all actions
Modal Behavior: Spring animations, drag-to-dismiss gesture
Additional Notes
All property views remain synchronized (liking a property in one view updates all instances)
Property categorization persists between sessions
Search results in chat remain accessible even after multiple searches

# Mes Biens (My Properties) Feature Specification

## Overview
The "Mes Biens" feature provides users with a centralized place to view and manage their property interactions, organized into three primary categories: Liked, Seen, and Unseen.

## Components

### 1. Three-Tab Navigation
- **Tab Structure**: Three tabs labeled "Liked" (default), "Seen", and "Unseen"
- **Visual Indication**: Active tab highlighted with blue text and underline indicator
- **Animation**: Smooth transitions between tabs with sliding animation
- **State Management**: Remembers active tab between sessions

### 2. Property List Interface
- **Layout**: Vertical scrolling list of properties filtered by the active tab
- **Property Card**: Compact card showing property thumbnail, basic details, and status icon
- **Empty State**: Custom message and icon when no properties exist in a tab
- **Visual Feedback**: Status icons (heart for liked, eye for seen, crossed-out eye for unseen)

### 3. Three-Quarter Screen Property Detail Modal
- **Activation**: Opens when a property is tapped in the list
- **Size**: Covers 75% of the device viewport (not browser window)
- **Layout**: Full property details with image, specifications, description, features, location
- **Actions**: Contact agent and share buttons at the bottom
- **Interaction**: Drag handle for dismissal, spring animations

### 4. iOS-Specific Adaptations
- **Viewport Handling**: Proper use of device viewport measurements
- **Safe Area Management**: Respects iOS safe areas (notch, home indicator)
- **Animation Quality**: Native-feeling spring animations and gestures
- **Accessibility**: Touch targets comply with iOS standards

## User Flow
1. User navigates to the "Mes Biens" tab in the main navigation
2. The "Liked" tab is shown by default with saved properties
3. User can switch between tabs to view different property states
4. Tapping a property opens the detail modal
5. User can contact agent or share directly from the detail view
6. Dragging down or tapping close dismisses the modal

## Implementation Notes
- Properties should maintain their categorization (liked/seen/unseen) across sessions
- The three-quarter modal height is fixed at 75% of device height
- Smooth transitions and animations enhance the premium feel
- Empty states should encourage specific actions (e.g., "Start browsing properties to add to your liked list")

## Future Enhancements (Phase 2)
- Filtering and sorting options within each tab
- Bulk actions for multiple properties
- Notes and custom tags for properties
- Integration with the "Cercle de Décision" collaborative feature
- Calendar integration for property viewings


Tag System V1 - Feature Specification
Overview
The Tag System is a core component of the French Property Finder app that automatically detects and manages user search criteria from natural language conversations, presenting them as interactive, visual elements that users can manipulate directly.
Primary Features
1. Auto-Tag Recognition
Natural Language Processing: Automatically detect property search criteria from user messages
Multi-Language Support: Recognize criteria in both French and English text
Contextual Understanding: Differentiate between vague and specific requirements
Confidence Scoring: Assign confidence levels to detected criteria
Progressive Refinement: Improve detection accuracy through conversation
2. Tag Hierarchy
Primary Tags: Essential search parameters with higher visual prominence
Location: City, neighborhood, arrondissement, postal code
Budget: Maximum price, price range, "under X" values
Rooms: Number of bedrooms, property type (studio, T2, etc.)
Secondary Tags: Additional features and preferences with secondary styling
Features: Balcony, elevator, parking, garden, etc.
Property Condition: New, renovated, to renovate, etc.
Environmental: Energy rating, proximity to parks, etc.
3. Interactive Management
Tap-to-Toggle: Enable/disable individual criteria without removing them
Remove Option: Completely remove unwanted criteria
Direct Editing: Edit tag values with inline input fields
Visual Feedback: Clear indication of active vs. inactive criteria
Auto-Updating Results: Property results update instantly when criteria change
4. Sharable Tag Sets ("Critères Partagés")
One-Click Sharing: Generate shareable links containing selected criteria
Visual Preview: Create attractive preview cards for social sharing
WhatsApp Integration: Direct sharing to WhatsApp contacts
Collaborative Filtering: Allow multiple users to contribute criteria
Tag Set Import: Accept and merge criteria from shared links
User Interface
Tag Visual Design
Pill-Shaped Format: Rounded rectangles with appropriate padding
Color Coding:
Primary tags: Blue (#3B82F6)
Secondary tags: Green (#10B981)
Inactive tags: Gray (#9CA3AF)
Typography:
Font: Inter or system font
Size: 14px (mobile), 16px (tablet+)
Icons: Use appropriate icons to enhance visual scanning
Location: Map pin
Budget: Euro symbol
Rooms: Bed icon
Features: Relevant feature icons
Tag Placement
Primary Location: Directly below the chat input field
Grouping: Organized by category with subtle dividers
Scrollable Container: Horizontal scroll for many tags
Expanded View Option: Button to expand/collapse full criteria set
Animation
Creation: Subtle scale and fade-in when tags are created
Toggle: Smooth color transition when toggling active state
Removal: Fade-out and collapse animation when removed
Interaction Patterns
Creation Flow
User sends message containing property criteria
System detects criteria and converts to tags
Tags appear with subtle animation
Assistant acknowledges detected criteria in response
Editing Flow
User taps a tag to toggle active/inactive state
Long-press opens edit mode with value adjustment
Property results update immediately on any change
Tag changes persist across conversation
Sharing Flow
User taps "Share Criteria" button
System generates visual preview card with all active criteria
User selects sharing method (Copy Link, WhatsApp, etc.)
Recipients can open link to import the exact criteria set
Technical Requirements
Pattern Recognition
Regular expression patterns for common criteria formats
Integration with NLP model for more complex recognition
Contextual analysis to improve accuracy
Data Structure
interface Tag {
  id: string;
  label: string;
  type: 'primary' | 'secondary';
  category: 'location' | 'budget' | 'rooms' | 'features' | 'condition' | 'environmental';
  value: string | number | Array<any>;
  confidence: number; // 0-1 score of detection confidence
  active: boolean;
  created: Date;
  modified: Date;
}

Storage & Persistence
Tags stored in local storage for session persistence
Sync with user account when authenticated
Maintain tag history for "previous searches" feature
Integration Points
Chat Interface
Seamless integration with the conversational UI
Tags appear below conversation or in dedicated section
Assistant references tags in responses
Property Results
Tag changes trigger property search API calls
Results reflect current active tag set
Explanation of how each property matches criteria
"Cercle de Décision"
Tags visible to all members of the decision circle
Indication of which user added which criteria
Collaborative tag editing capabilities
Accessibility Considerations
Sufficient color contrast for tag states
Touch targets at least 44×44px
Screen reader support for tag actions
Keyboard navigation support
Future Enhancements (V2)
AI-suggested criteria based on conversation context
Tag templates for common property searches
Advanced filtering logic (AND/OR/NOT operations)
Tag analytics to track most common search criteria
Cross-device synchronization of tag sets
Implementation Notes
Phase 1: Basic tag detection, visualization, and interaction
Phase 2: Shareable tag sets and WhatsApp integration
Phase 3: Full collaborative tag editing in Decision Circles


Tag System V1 - Feature Specification
Overview
The Tag System is a core component of the French Property Finder app that automatically detects and manages user search criteria from natural language conversations, presenting them as interactive, visual elements that users can manipulate directly.
Primary Features
1. Auto-Tag Recognition
Natural Language Processing: Automatically detect property search criteria from user messages
Multi-Language Support: Recognize criteria in both French and English text
Contextual Understanding: Differentiate between vague and specific requirements
Confidence Scoring: Assign confidence levels to detected criteria
Progressive Refinement: Improve detection accuracy through conversation
2. Tag Hierarchy
Primary Tags: Essential search parameters with higher visual prominence
Location: City, neighborhood, arrondissement, postal code
Budget: Maximum price, price range, "under X" values
Rooms: Number of bedrooms, property type (studio, T2, etc.)
Secondary Tags: Additional features and preferences with secondary styling
Features: Balcony, elevator, parking, garden, etc.
Property Condition: New, renovated, to renovate, etc.
Environmental: Energy rating, proximity to parks, etc.
3. Interactive Management
Tap-to-Toggle: Enable/disable individual criteria without removing them
Remove Option: Completely remove unwanted criteria
Quick Selection Editing: Edit tag values with a fan-style option selector displaying up to 5 relevant alternatives
Visual Feedback: Clear indication of active vs. inactive criteria
Auto-Updating Results: Property results update instantly when criteria change
4. Sharable Tag Sets ("Critères Partagés")
One-Click Sharing: Generate shareable links containing selected criteria
Visual Preview: Create attractive preview cards for social sharing
WhatsApp Integration: Direct sharing to WhatsApp contacts
Collaborative Filtering: Allow multiple users to contribute criteria
Tag Set Import: Accept and merge criteria from shared links
User Interface
Tag Visual Design
Pill-Shaped Format: Rounded rectangles with appropriate padding
Color Coding:
Primary tags: Blue (#3B82F6)
Secondary tags: Green (#10B981)
Inactive tags: Gray (#9CA3AF)
Typography:
Font: Inter or system font
Size: 14px (mobile), 16px (tablet+)
Icons: Use appropriate icons to enhance visual scanning
Location: Map pin
Budget: Euro symbol
Rooms: Bed icon
Features: Relevant feature icons
Tag Placement
Primary Location: Directly below the chat input field
Grouping: Organized by category with subtle dividers
Scrollable Container: Horizontal scroll for many tags
Expanded View Option: Button to expand/collapse full criteria set
Animation
Creation: Subtle scale and fade-in when tags are created
Toggle: Smooth color transition when toggling active state
Removal: Fade-out and collapse animation when removed
Option Fan: Fan-style animation similar to macOS dock stacks when long-pressing a tag, with options appearing in an arc above the tag
Interaction Patterns
Creation Flow
User sends message containing property criteria
System detects criteria and converts to tags
Tags appear with subtle animation
Assistant acknowledges detected criteria in response
Editing Flow
User taps a tag to toggle active/inactive state
Long-press opens fan-style option selector with up to 5 relevant alternatives
Property results update immediately on any change
Tag changes persist across conversation
Sharing Flow
User taps "Share Criteria" button
System generates visual preview card with all active criteria
User selects sharing method (Copy Link, WhatsApp, etc.)
Recipients can open link to import the exact criteria set
Technical Requirements
Pattern Recognition
Regular expression patterns for common criteria formats
Integration with NLP model for more complex recognition
Contextual analysis to improve accuracy
Data Structure
interface Tag {
  id: string;
  label: string;
  type: 'primary' | 'secondary';
  category: 'location' | 'budget' | 'rooms' | 'features' | 'condition' | 'environmental';
  value: string | number | Array<any>;
  confidence: number; // 0-1 score of detection confidence
  active: boolean;
  created: Date;
  modified: Date;
}

Storage & Persistence
Tags stored in local storage for session persistence
Sync with user account when authenticated
Maintain tag history for "previous searches" feature
Integration Points
Chat Interface
Seamless integration with the conversational UI
Tags appear below conversation or in dedicated section
Assistant references tags in responses
Property Results
Tag changes trigger property search API calls
Results reflect current active tag set
Explanation of how each property matches criteria
"Cercle de Décision"
Tags visible to all members of the decision circle
Indication of which user added which criteria
Collaborative tag editing capabilities
Accessibility Considerations
Sufficient color contrast for tag states
Touch targets at least 44×44px
Screen reader support for tag actions
Keyboard navigation support
Future Enhancements (V2)
AI-suggested criteria based on conversation context
Tag templates for common property searches
Advanced filtering logic (AND/OR/NOT operations)
Tag analytics to track most common search criteria
Cross-device synchronization of tag sets
Implementation Notes
Phase 1: Basic tag detection, visualization, and interaction
Phase 2: Shareable tag sets and WhatsApp integration
Phase 3: Full collaborative tag editing in Decision Circles


API Integration - Feature Specification
Overview
This specification outlines how the French Property Finder application will integrate with the API Service Layer to connect existing UI components with live data. The integration will enable real-time property searching, user authentication, and collaborative features while maintaining a responsive user experience.
Primary Integration Points
1. Property Card Stack Integration
Data Binding: Connect the existing PropertyCardStack component to the property search API
Dynamic Loading: Implement progressive loading of property cards based on user swipes
Swipe Actions: Sync card swipe actions (like/dismiss) with the API
Offline Support: Maintain local state for offline interaction with later sync
Loading States: Add appropriate loading indicators during API requests
2. Tag System Integration
API-Driven Tag Suggestions: Enhance tag detection with backend NLP processing
Tag Persistence: Store and retrieve user tags across sessions
Real-time Updates: Update property results as tags are modified
Shareable Tags: Generate and consume API-based shareable tag links
Tag History: Track and suggest previously used tags
3. Chat Interface Integration
Conversation Persistence: Store chat history through the API
Natural Language Search: Process chat messages through API for advanced analysis
Message Context: Maintain contextual awareness for multi-message conversations
Typing Indicators: Show realistic typing indicators during API processing
Incremental Results: Display partial results while waiting for complete API response
4. User Authentication Integration
Phone Verification Flow: Connect the UI with OTP verification API
Session Management: Handle token storage, refresh, and expiration
Progressive Profile: Incrementally collect and store user data
Cross-device Sync: Synchronize user state across multiple devices
Guest Mode: Support limited functionality before verification
5. Collaborative Features Integration
Decision Circle Formation: Create and manage circles through API
Real-time Collaboration: Implement WebSocket connection for live updates
Shared Views: Synchronize property views among circle members
Reaction Tracking: Record and visualize member reactions to properties
Invitation System: Generate and process collaborative invitations
Technical Requirements
API Integration Patterns
State Management Pattern
// Component-level state management
interface ComponentState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// API request hook pattern
function useApiRequest<T>(apiFunction, ...params) {
  const [state, setState] = useState<ComponentState<T>>({
    data: null,
    isLoading: true,
    error: null,
    lastUpdated: null
  });
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const result = await apiFunction(...params);
        if (mounted) {
          setState({
            data: result,
            isLoading: false,
            error: null,
            lastUpdated: new Date()
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            isLoading: false,
            error: error.userMessage || "An error occurred",
            lastUpdated: new Date()
          });
        }
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
    };
  }, [apiFunction, ...params]);
  
  return state;
}

Offline-First Pattern
// Local storage with sync
interface LocalStorageItem<T> {
  data: T;
  syncStatus: 'synced' | 'pending' | 'failed';
  lastModified: Date;
}

// Example pattern for property likes
const saveLikedProperty = async (propertyId: string) => {
  // Immediately save to local storage
  const item: LocalStorageItem<string> = {
    data: propertyId,
    syncStatus: 'pending',
    lastModified: new Date()
  };
  
  // Add to local storage
  const likedProperties = getLikedPropertiesFromStorage();
  likedProperties.push(item);
  saveToStorage('liked_properties', likedProperties);
  
  // Attempt API sync
  try {
    await propertyService.likeProperty(propertyId);
    // Update sync status
    updateSyncStatus(propertyId, 'synced');
  } catch (error) {
    // Mark for retry
    updateSyncStatus(propertyId, 'failed');
    // Add to sync queue for background retry
    addToSyncQueue({ type: 'like_property', id: propertyId });
  }
};

User Experience Considerations
Loading States
Property Cards: Skeleton cards during initial load
Progressive Detail: Load essential property data first, then details
Tag System: Show tag placeholders during detection/loading
Chat Interface: Typing indicators during API processing
Error Handling
Retry Mechanisms: Automatic retry for transient failures
Fallback Content: Show cached data when API is unavailable
Error Messages: User-friendly contextual error messages
Recovery Options: Clear paths to recover from errors
Optimistic Updates
Like/Dismiss Actions: Update UI immediately before API confirmation
Tag Changes: Show tag updates instantly while syncing in background
Property Status: Reflect status changes immediately with background sync
User Preferences: Apply changes locally first, then sync to server
Implementation Phases
Phase 1: Core Property Data Integration
Connect PropertyCardStack to property search API
Implement basic property detail fetching
Add loading and error states to property components
Create property categorization (liked, seen, unseen)
Phase 2: User Authentication & Personalization
Implement phone verification flow
Connect user preferences to API
Set up cross-session persistence
Enable basic property interaction tracking
Phase 3: Tag System & Search Integration
Bind tag system to API services
Implement shareable tag links
Connect chat interface to natural language search
Set up tag history and suggestions
Phase 4: Collaborative Features & Advanced Sync
Implement Cercle de Décision API integration
Add real-time collaborative updates
Enable offline mode with background sync
Implement cross-device synchronization
Integration Testing Strategy
Mock API Environment
Create comprehensive mock API responses
Simulate various network conditions
Test error scenarios and recovery paths
Validate correct caching behavior
User Flows
Test complete search-to-save property flows
Validate tag creation through chat input
Verify collaborative decision processes
Ensure cross-device consistency
Performance Metrics
Time-to-interactive for property results
Response time for tag updates
Bandwidth usage optimization
API call frequency reduction
Component Integration Examples
PropertyCardStack Integration
// Within PropertyCardStack component
const { data: properties, isLoading, error } = useApiRequest(
  propertyService.searchWithTags,
  searchQuery,
  activeTags
);

// Handle loading state
if (isLoading && !properties) {
  return <PropertyCardSkeleton count={3} />;
}

// Handle error state
if (error) {
  return <ErrorMessage message={error} onRetry={handleRetry} />;
}

// Render property cards
return (
  <div className="property-stack">
    {properties.map(property => (
      <PropertyCard
        key={property.id}
        property={property}
        onLike={() => handleLike(property.id)}
        onDismiss={() => handleDismiss(property.id)}
      />
    ))}
  </div>
);

Tag System Integration
// Within TagSystem component
const [localTags, setLocalTags] = useState([]);

// Sync with API
useEffect(() => {
  if (user.authenticated) {
    // Load tags from API
    userService.getSavedTags()
      .then(apiTags => {
        setLocalTags(apiTags);
      })
      .catch(error => {
        console.error('Failed to load tags:', error);
      });
  } else {
    // Load from local storage for guests
    const storedTags = localStorage.getItem('user_tags');
    if (storedTags) {
      setLocalTags(JSON.parse(storedTags));
    }
  }
}, [user.authenticated]);

// Update tag (optimistic update pattern)
const handleTagUpdate = async (tagId, newValue) => {
  // Update locally first
  const updatedTags = localTags.map(tag => 
    tag.id === tagId ? {...tag, value: newValue} : tag
  );
  setLocalTags(updatedTags);
  
  // Then sync with API
  if (user.authenticated) {
    try {
      await userService.updateTag(tagId, newValue);
    } catch (error) {
      // Revert on failure
      setLocalTags(localTags);
      showErrorNotification(error.userMessage);
    }
  } else {
    // Store locally for guests
    localStorage.setItem('user_tags', JSON.stringify(updatedTags));
  }
};

Success Metrics
User Experience Metrics
Time to First Meaningful Content: < 1.5 seconds
API Response Processing Time: < 300ms
Offline Capability: 80% of core functions available offline
Error Recovery Rate: > 95% automatic recovery from transient errors
Technical Metrics
API Call Efficiency: < 3 API calls per user action
Cache Hit Rate: > 70% for frequently accessed data
Background Sync Success: > 99% completion rate
Token Refresh Success: > 99.9% success rate
Future Enhancements
Phase 5: Advanced Personalization
AI-powered property recommendations
Predictive tag suggestions
User behavior analysis for improved results
Location-aware property prioritization
Phase 6: Enhanced Collaboration
Video chat integration for property discussions
Shared annotation of property images
Group scheduling for property viewings
Multi-user decision analytics
This specification provides a comprehensive blueprint for integrating the French Property Finder UI components with the API Service Layer, ensuring a robust, responsive application with full data connectivity and synchronization capabilities.


Environment Variable Setup Guide
Overview
This guide explains how to set up the environment variables needed for the French Property Finder PWA in a Next.js project.
Required Environment Variables
The application requires the following environment variable:
NEXT_PUBLIC_API_URL: The base URL of your API service
Setting Up Environment Variables
1. Local Development
Create a .env.local file in the root of your project:
# .env.local
NEXT_PUBLIC_API_URL=https://api.frenchpropertyfinder.com/v1

For local development without a real API, you can leave it unset:
# .env.local
# NEXT_PUBLIC_API_URL=
# (When not set, the app will use mock data)

2. Different Environments
Create environment-specific files for different environments:
Development (.env.development)
NEXT_PUBLIC_API_URL=https://dev-api.frenchpropertyfinder.com/v1

Production (.env.production)
NEXT_PUBLIC_API_URL=https://api.frenchpropertyfinder.com/v1

3. Vercel Deployment
If deploying to Vercel:
Go to your project in the Vercel dashboard
Navigate to Settings > Environment Variables
Add NEXT_PUBLIC_API_URL with the appropriate value for each environment
Using the Fixed API Client
The updated API client has been modified to:
Use the NEXT_PUBLIC_API_URL environment variable
Fall back to mock data when the environment variable is not set
Provide detailed console logs for debugging
This approach allows you to:
Develop locally without a real API backend
Easily switch between environments
Test the full app flow with realistic data
Accessing Environment Variables in Code
In your Next.js components, you can access the environment variables like this:
// Example component that uses the environment variable
import React from 'react';

const ApiInfoComponent = () => {
  return (
    <div>
      <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'Using mock data'}</p>
    </div>
  );
};

export default ApiInfoComponent;

Troubleshooting
If you see the "Missing Environment Variables" warning:
Check that .env.local exists and contains the proper variables
Make sure the variable name is exactly NEXT_PUBLIC_API_URL
Restart your development server after adding environment variables
If developing without an API, you can safely ignore this warning as the app will use mock data
Remember that environment variables are only loaded at build time in Next.js, so you'll need to restart your development server after making changes.

Exact Tag Color Values
Based on the image you provided, here are the exact color values for the different tag categories:
Location Tag (Paris 16th - Purple)
Background: #DDD6FE (lighter purple)
Text: #5B21B6 (darker purple)
Tailwind classes: bg-purple-200 text-purple-800
Budget Tag (Max €800K - Amber/Brown)
Background: #FDE68A (light amber)
Text: #92400E (dark amber/brown)
Tailwind classes: bg-amber-200 text-amber-800
Rooms Tag (2 Bedrooms - Pink)
Background: #FBCFE8 (light pink)
Text: #9D174D (dark pink)
Tailwind classes: bg-pink-200 text-pink-800
Feature Tag (Balcony - Green)
Background: #A7F3D0 (light green)
Text: #065F46 (dark green)
Tailwind classes: bg-green-200 text-green-800
Property Type Tag (Apartment - Purple/Pink)
Background: #F5D0FE (light fuchsia)
Text: #86198F (dark fuchsia)
Tailwind classes: bg-fuchsia-200 text-fuchsia-800
Action Tag (Buying - Green)
Background: #BBF7D0 (light green)
Text: #166534 (dark green)
Tailwind classes: bg-green-200 text-green-800
Tag Sizing and Layout
Padding: px-3 py-1
Font size: text-xs
Border radius: rounded-full
Margin: mr-2 mb-1.5 (to keep them compact on one line)
Line height: Default or slightly tighter than default
To implement these exact colors in your TagPill component, replace the color classes with these values.



