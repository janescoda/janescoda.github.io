<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1.5rem 5%;
            border-bottom: 1px solid #eee;
        }

        nav ul {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
        }

        nav a {
            text-decoration: none;
            color: #333;
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            transition: color 0.3s;
        }

        nav a:hover {
            color: #6366f1;
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            padding: 2rem;
        }

        .hero h1 {
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 900;
            margin-bottom: 1rem;
            letter-spacing: -2px;
            animation: fadeInUp 1s ease;
        }

        .hero .subtitle {
            font-size: clamp(1rem, 3vw, 1.5rem);
            font-weight: 300;
            margin-bottom: 2rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            animation: fadeInUp 1s ease 0.2s both;
        }

        .hero .description {
            font-size: clamp(1.1rem, 2vw, 1.3rem);
            max-width: 800px;
            margin: 0 auto 3rem;
            line-height: 1.8;
            animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 2s infinite;
        }

        .scroll-indicator::before {
            content: '↓';
            font-size: 2rem;
            color: white;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }

        /* Section Styling */
        section {
            padding: 6rem 5%;
            max-width: 1400px;
            margin: 0 auto;
        }

        section h2 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 900;
            margin-bottom: 1rem;
            letter-spacing: -1px;
        }

        section .section-subtitle {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 3rem;
        }

        /* Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .project-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .project-image {
            width: 100%;
            height: 280px;
            object-fit: cover;
            transition: transform 0.5s;
        }

        .project-card:hover .project-image {
            transform: scale(1.1);
        }

        .project-info {
            padding: 2rem;
        }

        .project-info h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .project-info p {
            color: #666;
            margin-bottom: 1rem;
        }

        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tag {
            background: #f3f4f6;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            color: #555;
        }

        /* About Section */
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .about-text {
            font-size: 1.1rem;
            line-height: 1.9;
            color: #555;
        }

        .about-text p {
            margin-bottom: 1.5rem;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
        }

        .stat {
            text-align: center;
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: #667eea;
        }

        .stat-label {
            color: #666;
            margin-top: 0.5rem;
        }

        /* Skills Section */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
            margin-top: 3rem;
        }

        .skill-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: all 0.3s;
        }

        .skill-card:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            transform: translateY(-5px);
        }

        .skill-card h3 {
            font-size: 1.1rem;
            color: #333;
        }

        /* Contact Section */
        .contact {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            border-radius: 20px;
            padding: 6rem 2rem;
        }

        .contact h2 {
            color: white;
        }

        .contact-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        .btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
        }

        .btn-primary {
            background: white;
            color: #667eea;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .btn-secondary:hover {
            background: white;
            color: #667eea;
        }

        /* Footer */
        footer {
            background: #1a1a1a;
            color: white;
            text-align: center;
            padding: 3rem 5%;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .social-links a {
            color: white;
            font-size: 1.5rem;
            transition: color 0.3s;
        }

        .social-links a:hover {
            color: #667eea;
        }

        /* Responsive */
        @media (max-width: 768px) {
            nav ul {
                gap: 1.5rem;
            }

            .about-content {
                grid-template-columns: 1fr;
            }

            .stats {
                grid-template-columns: 1fr;
            }

            section {
                padding: 4rem 5%;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1>YOUR NAME</h1>
            <div class="subtitle">Full Stack Developer | Creative Coder</div>
            <p class="description">
                Building digital experiences that merge design and technology. 
                Specialized in creating modern, responsive web applications with a focus on 
                user experience and clean code.
            </p>
        </div>
        <div class="scroll-indicator"></div>
    </section>

    <!-- Projects Section -->
    <section id="projects">
        <h2>Featured Projects</h2>
        <p class="section-subtitle">A selection of my recent work</p>

        <div class="projects-grid">
            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Project 1" class="project-image">
                <div class="project-info">
                    <h3>E-Commerce Platform</h3>
                    <p>Full-stack online store with payment integration and admin dashboard</p>
                    <div class="project-tags">
                        <span class="tag">React</span>
                        <span class="tag">Node.js</span>
                        <span class="tag">MongoDB</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop" alt="Project 2" class="project-image">
                <div class="project-info">
                    <h3>Fitness Tracking App</h3>
                    <p>Mobile application for workout tracking and nutrition planning</p>
                    <div class="project-tags">
                        <span class="tag">React Native</span>
                        <span class="tag">Firebase</span>
                        <span class="tag">UI/UX</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" alt="Project 3" class="project-image">
                <div class="project-info">
                    <h3>Data Visualization Dashboard</h3>
                    <p>Real-time analytics dashboard with interactive charts</p>
                    <div class="project-tags">
                        <span class="tag">D3.js</span>
                        <span class="tag">JavaScript</span>
                        <span class="tag">API</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop" alt="Project 4" class="project-image">
                <div class="project-info">
                    <h3>Brand Identity System</h3>
                    <p>Complete brand guidelines and design system</p>
                    <div class="project-tags">
                        <span class="tag">Figma</span>
                        <span class="tag">Branding</span>
                        <span class="tag">Design</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop" alt="Project 5" class="project-image">
                <div class="project-info">
                    <h3>Portfolio CMS</h3>
                    <p>Custom content management system for creative professionals</p>
                    <div class="project-tags">
                        <span class="tag">Next.js</span>
                        <span class="tag">TypeScript</span>
                        <span class="tag">PostgreSQL</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="Project 6" class="project-image">
                <div class="project-info">
                    <h3>Generative Art Gallery</h3>
                    <p>Algorithm-based art pieces using creative coding</p>
                    <div class="project-tags">
                        <span class="tag">p5.js</span>
                        <span class="tag">Canvas</span>
                        <span class="tag">WebGL</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <h2>About Me</h2>
        <p class="section-subtitle">Developer, Designer, Creator</p>

        <div class="about-content">
            <div class="about-text">
                <p>
                    I'm a passionate full-stack developer with a keen eye for design and a love for 
                    creating seamless digital experiences. My journey in tech started with curiosity 
                    and has evolved into a career where I blend creativity with code.
                </p>
                <p>
                    With expertise in modern web technologies and a focus on user-centered design, 
                    I build applications that are not only functional but also beautiful and intuitive. 
                    I believe great products come from the perfect balance of form and function.
                </p>
                <p>
                    When I'm not coding, you'll find me exploring new design trends, contributing to 
                    open-source projects, or experimenting with creative coding and generative art.
                </p>
            </div>
            <div>
                <div class="stats">
                    <div class="stat">
                        <div class="stat-number">5+</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Projects</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">30+</div>
                        <div class="stat-label">Happy Clients</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills">
        <h2>Skills & Technologies</h2>
        <p class="section-subtitle">Tools I work with</p>

        <div class="skills-grid">
            <div class="skill-card"><h3>React</h3></div>
            <div class="skill-card"><h3>JavaScript</h3></div>
            <div class="skill-card"><h3>Node.js</h3></div>
            <div class="skill-card"><h3>TypeScript</h3></div>
            <div class="skill-card"><h3>Python</h3></div>
            <div class="skill-card"><h3>MongoDB</h3></div>
            <div class="skill-card"><h3>PostgreSQL</h3></div>
            <div class="skill-card"><h3>Git</h3></div>
            <div class="skill-card"><h3>Figma</h3></div>
            <div class="skill-card"><h3>Tailwind CSS</h3></div>
            <div class="skill-card"><h3>Next.js</h3></div>
            <div class="skill-card"><h3>Docker</h3></div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <h2>Let's Work Together</h2>
        <p class="section-subtitle" style="color: rgba(255,255,255,0.9);">
            Have a project in mind? Let's create something amazing.
        </p>
        <div class="contact-buttons">
            <a href="mailto:your.email@example.com" class="btn btn-primary">Send Email</a>
            <a href="#" class="btn btn-secondary">Download CV</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="social-links">
            <a href="https://github.com/yourusername" target="_blank">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
            <a href="https://twitter.com/yourusername" target="_blank">Twitter</a>
        </div>
        <p>&copy; 2024 Your Name. Built with passion and code.</p>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll animation to elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s, transform 0.6s';
            observer.observe(el);
        });
    </script>
</body>
</html>
