import React, { useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";
import Header from "../../components/Header/Header";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const username = useInput('')
    const text = useInput('')


    const addComment = async() => {
        try {
            const res = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, res.data]})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MainLayout title={'Music Platform - ' + track.name + ' - ' + track.artist} description={'Music platform, track: ' + track.name + ' by ' + track.artist}>
            <div className='track-page'>
                <Header data={track} type='track' />
                <div className='w-1/3 flex flex-col ml-10 bg-zinc-600/40 rounded p-4'>
                    <h1 className='text-2xl mb-3'>Lyrics</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad dignissimos ex minus, obcaecati possimus rerum velit voluptates. Deleniti exercitationem illo minima nam nesciunt? Animi architecto cum cumque deleniti dolor doloribus ea earum expedita fugiat hic, itaque iusto labore maxime nisi officia porro repellendus tempora! Deserunt dolore esse magni neque quos rerum ullam velit veniam? Debitis dolore dolorum nisi obcaecati quis saepe, voluptates. Accusamus alias animi architecto asperiores beatae cum delectus deleniti dicta dolor, dolore dolorum ducimus fugit ipsa ipsum laboriosam maiores minima minus mollitia nobis nostrum nulla odio placeat praesentium quis, quod repellendus sequi temporibus unde, velit vero voluptas! {track.text}</p>
                </div>


              <div className='comment-section'>
                  <div className='ml-10 mt-5 flex flex-col'>
                      <h1 className='text-2xl mb-5'>Comments</h1>
                      <input
                          className='bg-zinc-800 w-1/2 p-4 mb-4'
                          {...username}
                          placeholder='Your name'
                      />
                      <textarea
                          className='bg-zinc-800 w-1/2 p-4 rounded'
                          placeholder='Your comment'
                          {...text}
                          rows={3}
                      ></textarea>
                      <button onClick={addComment} className='mr-6 bg-white text-black py-1 px-2 mt-4 w-16 rounded active:scale-95 hover:bg-gray-200' >Send</button>
                  </div>
                  <div className='pb-10' >
                      {track.comments?.length > 0
                          ? (
                              track.comments.map(comment =>
                                  <div className='ml-10 mt-5 bg-zinc-800 w-1/2 p-4 rounded'>
                                      <h2 className='text-xl text-gray-600 border-b-2 w-28 pb-2'>{comment.username}</h2>
                                      <p className='pt-2'>{comment.text}</p>
                                  </div>
                              )

                          )
                          : <h3>No Comments yet</h3>
                      }
                  </div>
              </div>
            </div>
        </MainLayout>
    );
};

export default TrackPage;


export const getServerSideProps: GetServerSideProps = async({params}) => {
    const res = await axios.get('http://localhost:5000/tracks/' + params.id)

        return {
            props: {
                serverTrack: res.data
            },
        };
}
