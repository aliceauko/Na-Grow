# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



types = Type.create([{ name: 'Flowering', description: 'Plants that produce flowers.' }, 
                     { name: 'Low-light', description: 'Plants that do not require direct exposure to sunlight and can survive in low light conditions.' },
                     { name: 'Air-purifying', description: 'Plants that help in cleaning air.' },
                     { name: 'Trailing', description: 'Plants that have long twigs, branches or leaves that twirl other palnts.' },
                     { name: 'Succulents and cacti', description: 'Plants that require little water to grow.' }])

