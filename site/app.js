/**
 * Personal Development Plan - Documentation Viewer
 * A single-page documentation site that renders markdown files
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        basePath: 'materials',
        manifestPath: 'manifest.json',
        defaultFile: 'overview.md',
        fileExtensions: ['.md'],
        ignoreFolders: ['web-view', '.git', 'node_modules'],
        ignoreFiles: ['.gitignore', '.gitkeep']
    };

    // State
    let state = {
        currentFile: null,
        treeData: null,
        searchQuery: '',
        isDarkMode: true
    };

    // DOM Elements
    const elements = {
        treeNav: document.getElementById('treeNav'),
        content: document.getElementById('markdownContent'),
        mainContent: document.getElementById('content'),
        contentScrollWrapper: document.querySelector('.content-scroll-wrapper'),
        searchInput: document.getElementById('searchInput'),
        themeToggle: document.getElementById('themeToggle'),
        menuToggle: document.getElementById('menuToggle'),
        sidebar: document.getElementById('sidebar')
    };

    // Initialize marked with custom renderer
    function initializeMarked() {
        const renderer = new marked.Renderer();

        // Custom heading renderer with IDs (no visible anchor links)
        renderer.heading = function(text, level) {
            // Strip HTML tags to get plain text for ID generation
            const plainText = text.replace(/<[^>]*>/g, '');
            const escapedText = plainText.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '');
            return `<h${level} id="${escapedText}">${text}</h${level}>`;
        };

        // Custom link renderer to handle relative links
        renderer.link = function(href, title, text) {
            // Check if it's a relative markdown link
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Convert to clickable internal link
                const cleanHref = href.replace(/^\.\//, '').replace(/\.md$/, '');
                return `<a href="#" data-file="${href}" onclick="window.loadFileFromLink(event, '${href}')"${title ? ` title="${title}"` : ''}>${text}</a>`;
            }
            // External links open in new tab
            const target = href && href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `<a href="${href}"${title ? ` title="${title}"` : ''}${target}>${text}</a>`;
        };

        // Custom code block renderer with language detection
        renderer.code = function(code, language) {
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            const highlighted = hljs.highlight(code, { language: validLanguage }).value;
            return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
        };

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            breaks: false,
            pedantic: false,
            smartLists: true,
            smartypants: true
        });
    }

    // Load file from internal link click
    window.loadFileFromLink = function(event, href) {
        event.preventDefault();
        
        // Resolve the path relative to current file
        if (state.currentFile && href.startsWith('./')) {
            const currentDir = state.currentFile.substring(0, state.currentFile.lastIndexOf('/'));
            href = currentDir + '/' + href.substring(2);
        } else if (state.currentFile && href.startsWith('../')) {
            let currentDir = state.currentFile.substring(0, state.currentFile.lastIndexOf('/'));
            while (href.startsWith('../')) {
                currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'));
                href = href.substring(3);
            }
            href = currentDir + '/' + href;
        }
        
        // Clean up the path
        href = href.replace(/\/\//g, '/');
        
        loadFile(href);
    };

    // Load the manifest file
    async function loadManifest() {
        try {
            const response = await fetch(CONFIG.manifestPath);
            if (!response.ok) {
                throw new Error('Manifest not found');
            }
            const data = await response.json();
            state.treeData = data;
            renderTree(data);
            
            // Load default file or from URL hash
            const hashFile = window.location.hash.substring(1);
            if (hashFile) {
                loadFile(decodeURIComponent(hashFile));
            } else if (CONFIG.defaultFile) {
                loadFile(CONFIG.defaultFile);
            }
        } catch (error) {
            console.error('Error loading manifest:', error);
            elements.treeNav.innerHTML = `
                <div class="loading" style="color: var(--error-color); padding: 1rem;">
                    <p><strong>Error loading content structure</strong></p>
                    <p style="font-size: 0.875rem; margin-top: 0.5rem;">
                        Please run the manifest generator script to create the file structure.
                    </p>
                    <pre style="margin-top: 1rem; font-size: 0.75rem; background: var(--bg-tertiary); padding: 0.5rem; border-radius: 4px;">
.\\generate-manifest.ps1</pre>
                </div>
            `;
        }
    }

    // Render the tree navigation
    function renderTree(data, container = elements.treeNav, level = 0) {
        if (level === 0) {
            container.innerHTML = '';
        }

        // Sort items: files first, then folders
        const sortedData = [...data].sort((a, b) => {
            // Files come before folders
            if (a.type === 'file' && b.type === 'folder') return -1;
            if (a.type === 'folder' && b.type === 'file') return 1;
            // Within same type, sort alphabetically by name
            return a.name.localeCompare(b.name);
        });

        sortedData.forEach(item => {
            const treeItem = document.createElement('div');
            treeItem.className = 'tree-item';
            treeItem.style.paddingLeft = `${level * 0.5}rem`;

            const header = document.createElement('div');
            header.className = `tree-item-header ${item.type === 'folder' ? 'folder' : 'file'}`;
            
            if (item.type === 'folder') {
                header.innerHTML = `
                    <span class="tree-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </span>
                    <span class="file-icon">📁</span>
                    <span class="tree-label">${formatLabel(item.name)}</span>
                `;

                const children = document.createElement('div');
                children.className = 'tree-children';
                
                header.addEventListener('click', () => {
                    header.querySelector('.tree-icon').classList.toggle('expanded');
                    children.classList.toggle('expanded');
                });

                treeItem.appendChild(header);
                treeItem.appendChild(children);
                
                if (item.children && item.children.length > 0) {
                    renderTree(item.children, children, level + 1);
                }
            } else {
                const icon = getFileIcon(item.name);
                header.innerHTML = `
                    <span class="tree-icon" style="visibility: hidden;">
                        <svg viewBox="0 0 24 24"></svg>
                    </span>
                    <span class="file-icon">${icon}</span>
                    <span class="tree-label">${formatLabel(item.name)}</span>
                `;
                header.dataset.path = item.path;
                
                header.addEventListener('click', () => {
                    loadFile(item.path);
                });

                treeItem.appendChild(header);
            }

            container.appendChild(treeItem);
        });
    }

    // Format label for display
    function formatLabel(name) {
        // Remove file extension
        let label = name.replace(/\.(md|txt)$/i, '');
        // Remove numbering prefix like "01-" or "1.1-"
        label = label.replace(/^[\d.]+-/, '');
        // Convert kebab-case to Title Case
        label = label.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        return label;
    }

    // Get appropriate icon for file type
    function getFileIcon(filename) {
        if (filename.toLowerCase().includes('overview')) return '📋';
        if (filename.toLowerCase().includes('lesson')) return '📝';
        if (filename.toLowerCase().includes('readme')) return '📖';
        if (filename.endsWith('.md')) return '📄';
        return '📄';
    }

    // Load and render a markdown file
    async function loadFile(path) {
        try {
            // Clean the path
            path = path.replace(/^\/+/, '');
            
            const fullPath = `${CONFIG.basePath}/${path}`;
            const response = await fetch(fullPath);
            
            if (!response.ok) {
                throw new Error(`File not found: ${path}`);
            }
            
            const markdown = await response.text();
            
            // Update state
            state.currentFile = path;
            window.location.hash = encodeURIComponent(path);
            
            // Render markdown
            const html = marked.parse(markdown);
            elements.content.innerHTML = html;
            
            // Apply syntax highlighting to any unhighlighted code blocks
            elements.content.querySelectorAll('pre code:not(.hljs)').forEach(block => {
                hljs.highlightElement(block);
            });
            
            // Update active state in tree
            updateActiveState(path);
            
            // Scroll to top - wait for content to render
            setTimeout(() => {
                // Scroll content wrapper to top
                if (elements.contentScrollWrapper) {
                    elements.contentScrollWrapper.scrollTop = 0;
                }
            }, 0);
            
            // Close mobile sidebar
            elements.sidebar.classList.remove('open');
            document.querySelector('.sidebar-overlay')?.classList.remove('active');
            
        } catch (error) {
            console.error('Error loading file:', error);
            elements.content.innerHTML = `
                <div class="welcome">
                    <h1>File Not Found</h1>
                    <p>Could not load: ${path}</p>
                    <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-muted);">
                        ${error.message}
                    </p>
                </div>
            `;
        }
    }

    // Update active state in tree navigation
    function updateActiveState(path) {
        // Remove all active states
        document.querySelectorAll('.tree-item-header.active').forEach(el => {
            el.classList.remove('active');
        });
        
        // Find and activate the current file
        const activeElement = document.querySelector(`[data-path="${path}"]`);
        if (activeElement) {
            activeElement.classList.add('active');
            
            // Expand parent folders
            let parent = activeElement.closest('.tree-children');
            while (parent) {
                parent.classList.add('expanded');
                const icon = parent.previousElementSibling?.querySelector('.tree-icon');
                if (icon) icon.classList.add('expanded');
                parent = parent.parentElement.closest('.tree-children');
            }
        }
    }

    // Search functionality
    function initializeSearch() {
        elements.searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            filterTree();
        });
    }

    // Filter tree based on search query
    function filterTree() {
        const query = state.searchQuery;
        const items = document.querySelectorAll('.tree-item');
        
        items.forEach(item => {
            const label = item.querySelector('.tree-label')?.textContent.toLowerCase() || '';
            const matches = query === '' || label.includes(query);
            
            if (matches) {
                item.style.display = '';
                // Show parent folders
                let parent = item.parentElement;
                while (parent && parent.classList.contains('tree-children')) {
                    parent.classList.add('expanded');
                    parent.previousElementSibling?.querySelector('.tree-icon')?.classList.add('expanded');
                    parent.parentElement.style.display = '';
                    parent = parent.parentElement.parentElement;
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Theme toggle functionality
    function initializeTheme() {
        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        state.isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;
        applyTheme();
        
        elements.themeToggle.addEventListener('click', () => {
            state.isDarkMode = !state.isDarkMode;
            applyTheme();
            localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
        });
    }

    // Apply the current theme
    function applyTheme() {
        const body = document.body;
        const hljsDark = document.getElementById('hljs-theme-dark');
        const hljsLight = document.getElementById('hljs-theme-light');
        
        if (state.isDarkMode) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            hljsDark.disabled = false;
            hljsLight.disabled = true;
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            hljsDark.disabled = true;
            hljsLight.disabled = false;
        }
    }

    // Mobile menu toggle
    function initializeMobileMenu() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        elements.menuToggle.addEventListener('click', () => {
            elements.sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            elements.sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Handle browser navigation
    function initializeNavigation() {
        window.addEventListener('hashchange', () => {
            const hashFile = window.location.hash.substring(1);
            if (hashFile && hashFile !== state.currentFile) {
                loadFile(decodeURIComponent(hashFile));
            }
        });
    }

    // Initialize the application
    function init() {
        initializeMarked();
        initializeTheme();
        initializeSearch();
        initializeMobileMenu();
        initializeNavigation();
        loadManifest();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
