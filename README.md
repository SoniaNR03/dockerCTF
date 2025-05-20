# 🛡️ Diseño e implementación de una plataforma CTF basada en contenedores

Este proyecto consiste en el desarrollo de una **plataforma web de CTFs (Capture The Flag)** . Permite lanzar desafíos de seguridad informática a través de contenedores Docker, ofreciendo a los usuarios un entorno práctico y seguro para el aprendizaje de técnicas y vulnerabilidades reales.

---

## 📌 Índice

- [🎯 Objetivo](#-objetivo)
- [🚀 Características principales](#-características-principales)
- [🧰 Requisitos previos](#-requisitos-previos)
- [⚙️ Instrucciones de despliegue](#️-instrucciones-de-despliegue)

---

## 🎯 Objetivo

El objetivo principal de este Trabajo de Fin de Grado es diseñar una **plataforma CTF personalizable**, capaz de desplegar entornos aislados mediante Docker, con retos que abordan distintas vulnerabilidades web y de sistema. La plataforma busca proporcionar un medio accesible y práctico para la enseñanza de la ciberseguridad.

---

## 🚀 Características principales

- Interfaz web ejecutada a través de Docker
- Ejecución de contenedor Docker por CTF
- Validación automática de flags
- Control de acceso y gestión de sesiones

---

## 🧰 Requisitos previos

Asegúrate de tener instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Instrucciones de despliegue

1. Clona este repositorio:

   ```bash
   git clone https://github.com/SoniaNR03/dockerCTF
   ```

2. Despliega el contenedor docker:

   ```bash
   cd plataforma-ctf-tfg
   docker compose up --build
   ```

3. Accede a http://localhost/
