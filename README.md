# nexus

Installation:

```
git clone git@github.com:srfoster/nexus.git
cd nexus
docker-compose -f stack.yml build
```

Development:

```
docker-compose -f stack.yml up
```

The database should get created and seeded the first time you do this.

Now you should be able to edit files in `frontend/` or `backend/`.  Reloading should be automatic.

Running tests:

```
docker exec -it [backend container id] bash
npm run test
```
