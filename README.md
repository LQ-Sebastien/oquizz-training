# OQuiz

## JOUR 6, Sprint 2

- Pouvoir m'inscrire afin d'avoir un compte et répondre aux quiz
- Pouvoir me connecter à mon compte afin de pouvoir répondre aux quiz
- Pouver accéder à ma page profil afin de visualiser les données de mon compte
- Pouvoir me déconnecter

## Jour 4 : Atelier, Sprint 1

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans notre archi Express !

### Visualiser les titres, les sous-titres et les auteurs des quiz sur la page d’accueil

Remplacer les fausses données "en dur", de la page d'accueil, par les données issues des Models !

Ici, se servir de la documentation Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/eager-loading.html)).
Au revoir les dataMappers pour ce coup-ci !

### Pouvoir accéder aux questions d’un quiz

Il va falloir une nouvelle route (`/quiz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`quizController`).

Ici aussi, Sequelize va être bien pratique...

1. pouvoir visualiser la difficulté de chaque question

2. visualiser tous les sujets rattachés au quiz

### pouvoir visualiser tous les sujets

Nouvelle route (`/tags`)

Nouveau controller (`tagController`)

### pouvoir visualiser tous les quiz pour un sujet donné

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quiz concernées !

### :v: Bonus facile : Ajouter tous les liens qui pourraient manqués

Il y a surement des endroits où il serait intéressant de pouvoir cliquer, afin de rendre la navigation plus fluide.

### :skull_and_crossbones::clock4: Bonus de la mort où j'ai une semaine devant moi et je savais pas quoi faire : formulaires

Rajouter les formulaires d'inscription et de connexion.
Avec tout ce qui est nécessaire (Ajout en base de données, login en session plus ou moins longue)


## Jour 2 : Sequelize

On a un super ORM, on créé des models ?

Créer le model Question

Commencer par vérifier que tout fonctionne dans un controller questionController, par exemple  :

*   Trouver toutes les Question.
*   Trouver la question dont l'id est 3.
*   Créer une question
*   Supprimer une question

Bonus qui pique :

Récupérer une Question avec son Level associé : https://sequelize.org/docs/v6/core-concepts/assocs/

## Jour 1 : Active Record

Les méthodes Active Record du modèle `Level` ont été codées.

On a pu vérifier que ces méthodes fonctionnent en jouant dans `test.js`.

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir coder les méthodes Active Record du modèle `User` :

- `findAll(callback)`, qui trouve tous les Users dans la base de données.
- `findById(id, callback)`, qui trouve un User en fonction de son ID.
- `insert(callback)`, qui insert l'instance courante dans la base de données.
- `update(callback)`, qui met à jour l'instance courante dans la base de données.
- `delete(callback)`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)


## Jour Zéro : Le début du commencement

Pour commencer, il faut mettre en place la base de données !
*Vous n'allez pas l'utiliser dans ce challenge, mais ca sera fait et ça vous rafraichit la mémoire.*

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

---

**Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.**

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

**Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".**

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

**Créer les tables grâce au fichier "import_tables.sql".**

- `psql -U oquiz -f data/import_tables.sql`

**Importer les données grâce au fichier "import_data.sql".**

- `psql -U oquiz -f data/import_data.sql`

---

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Du code classe !

L'architecture basique à base d'Express est déjà en place avec une route `/` et le controller pour y répondre.

Créer un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

---

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {

  id;
  name;
  
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
  }

};
```

---

</details>

## Don't Repeat Yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.
- Penser à supprimer les propriété `id` de toutes les classes "fille"

## Bonus 1 : ne pas autoriser de valeurs absurdes

Dans les mutateurs, rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class Tag … {

  name;

  constructor(obj) {

    …

    if(typeof obj.name !== 'string') {
      throw Error("Tag name must be a string!");
      // on "lève" une erreur => ça arrête tout !
    }

    this.name = obj.name;

  }

};
```

</details>

## Bonus 2 : Accesseurs

Dans le `CoreModel` passer la propriété `id` en propriété privée, puis ajouté un accesseur permettant de lire cette propriété. Cela aura pour effet de ne pas permettre la modification manuelle de celle-ci.

Puis rechercher des modèles qui auraient potentiellement besoin d'un accesseur (getter) afin de faciliter la récupération d'informations composites.
